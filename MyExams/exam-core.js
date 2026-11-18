(function(root){
  'use strict';
  function shuffle(items,random=Math.random){const copy=items.slice();for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;}
  function createExam(bank,category,count=10,random=Math.random){
    const pool=bank.filter(q=>!q.requiresReview&&(category==='all'||q.category===category));
    if(!Number.isInteger(count)||count<1||count>pool.length)throw new Error(`Choose between 1 and ${pool.length} questions.`);
    return shuffle(pool,random).slice(0,count).map(q=>({...q,options:shuffle([q.answer,...q.distractors],random)}));
  }
  function createSession(questions){return {questions,answers:Array(questions.length).fill(null),revealed:Array(questions.length).fill(false)};}
  function select(session,index,answer){if(!session.questions[index]||session.revealed[index]||!session.questions[index].options.includes(answer))return false;session.answers[index]=answer;return true;}
  function reveal(session,index){if(!session.questions[index]||session.answers[index]===null)return null;session.revealed[index]=true;return {correct:session.answers[index]===session.questions[index].answer,answer:session.questions[index].answer};}
  function grade(questions,answers){
    if(!questions.length||answers.length!==questions.length||questions.some((q,i)=>!q.options.includes(answers[i])))throw new Error('Answer every question before finishing.');
    const correct=questions.filter((q,i)=>q.answer===answers[i]).length;
    return {correct,total:questions.length,percentage:Math.round(correct/questions.length*100),missed:questions.filter((q,i)=>q.answer!==answers[i]).map(q=>q.id)};
  }
  root.FBPExam={shuffle,createExam,createSession,select,reveal,grade};
})(typeof window==='undefined'?globalThis:window);
