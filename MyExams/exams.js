(function(){
  'use strict';
  FBP.createPage({container:'main',title:'MyExams',subtitle:'Choose your exam. Learn from every answer.',microline:'PERSONAL PRACTICE EXAMS',activePage:'myExams',feedbackText:'MyExams Feedback'});
  const $=id=>document.getElementById(id),bank=window.FBP_QUESTION_BANK,key='fbp-exams-v1';
  let session,position=0,active=false,category='A350';
  let record={history:[],missed:[]};
  try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&Array.isArray(saved.history)&&Array.isArray(saved.missed))record=saved;}catch{}
  function node(tag,text,className){const el=document.createElement(tag);el.textContent=text;if(className)el.className=className;return el;}
  function show(id){['setup','exam','results'].forEach(s=>$(s).hidden=s!==id);}
  function history(){
    $('history').replaceChildren();
    if(!record.history.length)$('history').append(node('p','No completed exams yet.'));
    for(const item of record.history.slice(0,10))$('history').append(node('p',`${new Date(item.date).toLocaleDateString('en-GB')} | ${item.category==='all'?'Mixed':item.category} | ${item.percentage}% (${item.correct}/${item.total||20})`));
  }
  function status(){
    const scoped=bank.filter(q=>$('subject').value==='all'||q.category===$('subject').value);
    const pending=scoped.filter(q=>q.requiresReview);
    const count=scoped.length-pending.length,previous=$('exam-length').value;
    const sizes=$('subject').value==='all'?[10,25,50]:[10,25,count];
    $('exam-length').replaceChildren();
    [...new Set(sizes)].forEach(size=>{const option=node('option',`${size} questions${$('subject').value!=='all'&&size===count?' (all available)':''}${size>count?' - not enough available':''}`);option.value=String(size);option.disabled=size>count;$('exam-length').append(option);});
    const available=[...$('exam-length').options].filter(o=>!o.disabled);
    $('exam-length').value=available.some(o=>o.value===previous)?previous:available[0]?.value||'';
    $('start').disabled=!available.length;
    $('bank-status').textContent=`${count} questions available${pending.length?` | ${pending.length} older items awaiting verification`:''} | No time limit. Answers are revealed one at a time.`;
    $('pending-items').replaceChildren();$('pending').hidden=pending.length===0;
    pending.forEach(q=>$('pending-items').append(node('p',`${q.source}, question ${q.sourceQuestionNumbers.join(', ')}: ${q.reviewReason}`)));
  }
  function start(){category=$('subject').value;session=FBPExam.createSession(FBPExam.createExam(bank,category,Number($('exam-length').value)));position=0;active=true;show('exam');render();}
  function updateFeedback(){
    const q=session.questions[position],isRevealed=session.revealed[position];$('feedback').hidden=!isRevealed;
    if(isRevealed){const correct=session.answers[position]===q.answer;$('feedback').className='answer-feedback '+(correct?'is-correct':'is-wrong');$('feedback-title').textContent=correct?'Correct':'Incorrect';}
    $('next').disabled=session.answers[position]===null;
    $('next').textContent=!isRevealed?'Reveal answer':position===session.questions.length-1?'Finish exam':'Next question';
    const n=session.revealed.filter(Boolean).length;$('answered').textContent=`${n} of ${session.questions.length} revealed`;$('progress').value=n;
  }
  function render(){
    const q=session.questions[position];$('exam-subject').textContent=category==='all'?`Mixed revision | ${q.category}`:q.category;
    $('position').textContent=`Question ${position+1} of ${session.questions.length}`;$('progress').max=session.questions.length;
    $('question').textContent=q.question;$('options').replaceChildren();
    q.options.forEach((option,i)=>{
      const label=document.createElement('label');label.className='answer-option';
      const input=document.createElement('input');input.type='radio';input.name='answer';input.value=option;input.id=`choice-${i}`;input.checked=session.answers[position]===option;input.disabled=session.revealed[position];
      input.addEventListener('change',()=>{if(FBPExam.select(session,position,option))updateFeedback();});
      if(session.revealed[position]){
        if(option===q.answer)label.classList.add('correct-choice');
        if(input.checked&&option!==q.answer)label.classList.add('wrong-choice');
      }
      label.append(input,node('span',option));$('options').append(label);
    });
    $('back').disabled=position===0;updateFeedback();$('question').focus();
  }
  function review(){
    $('review').replaceChildren();
    session.questions.forEach((q,i)=>{
      if(session.answers[i]===q.answer)return;
      const article=node('article','','review-item');
      article.append(node('span',`Incorrect | ${q.category}`,'review-state wrong'),node('h4',`${i+1}. ${q.question}`),node('p',`Your answer: ${session.answers[i]}`),node('p',`Correct answer: ${q.answer}`,'review-answer'));
      const cue=window.FBP_MEMORY_CUES?.[q.id]||q.note||`Make a two-sided flashcard. Say "${q.answer}" aloud, cover it, then recall it after a short break.`;
      article.append(node('p',`Memory cue: ${cue}`,'memory-cue'),node('p',`Source: ${q.source} | ${q.officialChoices?'official practice-exam choices':'revision notes; generated alternative choices'}`,'review-source'));$('review').append(article);
    });
    $('review-panel').hidden=false;$('review-button').hidden=true;$('review-title').focus();
  }
  function finish(){
    if(session.revealed.some(r=>!r))return;
    const result=FBPExam.grade(session.questions,session.answers);active=false;
    record.history.unshift({category,correct:result.correct,total:result.total,percentage:result.percentage,date:new Date().toISOString()});record.history=record.history.slice(0,20);
    try{localStorage.setItem(key,JSON.stringify(record));$('save-status').textContent='Result saved on this device.';}catch{$('save-status').textContent='This browser could not save revision history.';}
    $('score').textContent=`${result.percentage}%`;$('score-detail').textContent=`${result.correct} out of ${result.total} correct | ${category==='all'?'Mixed revision':category}`;
    const mixed=category==='all',passed=result.correct*100>=result.total*80;
    $('pass-status').hidden=mixed;
    $('pass-status').className='answer-feedback '+(passed?'is-correct':'is-wrong');
    $('pass-status').textContent=mixed?'':passed?'Pass — you achieved the required 80% or more.':'Fail — this would be a fail in a live exam. You need at least 80% to pass. Revisit your incorrect answers before moving on.';
    $('again').textContent=`New ${result.total}-question exam`;$('review-button').hidden=result.missed.length===0;$('review-button').textContent=`Review incorrect answers (${result.missed.length})`;
    $('perfect').hidden=result.missed.length!==0;$('review-panel').hidden=true;$('review').replaceChildren();history();show('results');$('results-title').focus();
  }
  $('subject').addEventListener('change',status);
  $('setup-form').addEventListener('submit',event=>{event.preventDefault();start();});
  $('answer-form').addEventListener('submit',event=>{event.preventDefault();if(session.answers[position]===null)return;if(!session.revealed[position]){FBPExam.reveal(session,position);render();$('feedback').focus();}else if(position===session.questions.length-1)finish();else{position++;render();}});
  $('back').addEventListener('click',()=>{if(position>0){position--;render();}});
  $('exit').addEventListener('click',()=>{if(window.confirm('End this exam? Your unfinished answers will be discarded.')){active=false;show('setup');$('subject').focus();}});
  $('again').addEventListener('click',start);$('change').addEventListener('click',()=>{show('setup');$('subject').focus();});$('review-button').addEventListener('click',review);
  $('clear-history').addEventListener('click',()=>{if(window.confirm('Clear saved revision history on this device?')){record={history:[],missed:[]};try{localStorage.removeItem(key);}catch{}history();}});
  window.addEventListener('beforeunload',event=>{if(active){event.preventDefault();event.returnValue='';}});status();history();
})();
