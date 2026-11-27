const fs = require('node:fs');
const assert = require('node:assert/strict');
const path = require('node:path');
const {chromium} = require(process.env.MYDUTY_PLAYWRIGHT);
const sharp = require(process.env.MYDUTY_SHARP);
const root = process.cwd();
const out = path.join(root, 'tmp', 'pdfs', 'captures');
fs.mkdirSync(out, {recursive: true});
const localhost = 'http://myduty.test';
const screenshots = {};
const errors = [];
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json',
  '.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.ttf':'font/ttf','.pdf':'application/pdf','.ico':'image/x-icon'};
const demoBank = Array.from({length:12}, (_,i)=>({
  id:'demo-'+i, category:'General', question:[
    'Which MyDuty tool shows today’s scheduled report times?',
    'Which MyDuty tool opens crew forms and templates?',
    'Where can you find MyRoster on the home page?'
  ][i%3], answer:['MyASBY','MyDocuments','Admin'][i%3],
  distractors:[['MyRoster','MyCalendar'],['MyAircraft','MyExams'],['Important Dates','MyASBY']][i%3],
  source:'Illustration for this guide', note:'Match each MyDuty tool to the task it is designed for.'
}));
const fixtures = {
  '/data/practice-questions.js': 'window.FBP_QUESTION_BANK = '+JSON.stringify(demoBank)+';',
  '/data/sccm-expectations.js': 'globalThis.SCCM_EXPECTATIONS = {};',
  '/data/important-dates.js': 'globalThis.IMPORTANT_DATE_EVENTS = '+JSON.stringify([
    {date:'2026-11-23', label:'Example bidding opens', context:'Illustrative roster', time:'09:00',kind:'roster'},
    {date:'2026-11-27', label:'Example pay date', context:'Illustrative date',time:'',kind:'pay'},
    {date:'2026-11-29', label:'Example annual leave deadline', context:'Illustrative date',time:'23:59',kind:'leave'},
    {date:'2026-12-10', label:'Example roster release', context:'Illustrative date',time:'09:00',kind:'roster'}
  ])+';',
  '/data/report-times.js': 'globalThis.REPORT_TIME_SCHEDULES = '+JSON.stringify([
    {label:'Example',validFrom:'2026-11-01',validThrough:'2026-12-31',rows:[
      {time:'08:45',flight:'BA9001',destination:'JFK',aircraft:'B777',terminal:'T5',fleetFamilies:['B777']},
      {time:'11:20',flight:'BA9002',destination:'BOS',aircraft:'B787',terminal:'T5',fleetFamilies:['B787']},
      {time:'12:05',flight:'BA9003',destination:'MAD',aircraft:'Shorthaul',terminal:'T3',fleetFamilies:[]},
      {time:'12:45',flight:'BA9004',destination:'YYZ',aircraft:'B777',terminal:'T5',fleetFamilies:['B777']},
      {time:'14:10',flight:'BA9005',destination:'LAX',aircraft:'A350',terminal:'T5',fleetFamilies:['A350']},
      {time:'15:35',flight:'BA9006',destination:'CDG',aircraft:'Shorthaul',terminal:'T3',fleetFamilies:[]}
    ]}
  ])+';'
};
async function fixtureContext(browser, options={}) {
  const context=await browser.newContext({
    viewport: options.mobile ? {width:400,height:820} : {width:1080,height:900},
    isMobile:!!options.mobile, hasTouch:!!options.mobile, deviceScaleFactor:1,
    timezoneId:'Europe/London', colorScheme:'dark', reducedMotion:'reduce', acceptDownloads:true
  });
  if(options.admin){
    await context.addInitScript(origin=>{
      if(location.origin===origin) sessionStorage.setItem('fbpAdminAccess','granted');
    }, localhost);
  }
  await context.route('**/*', async route=>{
    const u=new URL(route.request().url());
    if(u.origin!==localhost) {
      if(u.hostname==='cdnjs.cloudflare.com'&&u.pathname.endsWith('/pdf.min.js'))
        return route.fulfill({contentType:'text/javascript',body:'window.pdfjsLib={GlobalWorkerOptions:{}};'});
      return route.abort();
    }
    if(u.pathname==='/assets/MyBriefingPresentation/whatsapp-qr.png'){
      return route.fulfill({contentType:'image/svg+xml', body:'<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="white"/><rect x="11" y="11" width="178" height="178" fill="#eef4fa" stroke="#021b41" stroke-width="2"/><text x="100" y="94" text-anchor="middle" font-family="Arial" font-size="18" fill="#021b41">EXAMPLE</text><text x="100" y="119" text-anchor="middle" font-family="Arial" font-size="13" fill="#021b41">Illustration only</text></svg>'});
    }
    if(fixtures[u.pathname]) return route.fulfill({contentType:types['.js'],body:fixtures[u.pathname]});
    let file=path.resolve(root,'.'+decodeURIComponent(u.pathname));
    if(file!==root&&!file.startsWith(root+path.sep)) return route.abort();
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
    if(!fs.existsSync(file)||!fs.statSync(file).isFile()) return route.fulfill({status:404,body:'Not found'});
    return route.fulfill({path:file,contentType:types[path.extname(file).toLowerCase()]||'application/octet-stream'});
  });
  const page=await context.newPage();
  await page.clock.setFixedTime(new Date('2026-11-27T10:17:00Z'));
  page.setDefaultTimeout(3500);
  page.on('pageerror', error=> errors.push([page.url(),error.message]));
  return [context,page];
}
const sel=(page, name)=>typeof name==='string'?page.locator(name).first():name.first();
async function rect(page, name, required=true){
  const el=sel(page,name);
  if(!(await el.isVisible())) {
    if(required) throw Error('Missing capture target '+String(name));
    return null;
  }
  return await el.evaluate(el=>{
    const r=el.getBoundingClientRect();
    return {x:r.left+scrollX,y:r.top+scrollY,w:r.width,h:r.height};
  });
}
async function shot(name, page, targets, marks=[], options={}){
  await page.evaluate(()=>document.fonts.ready);
  if(options.fixed) await page.evaluate(()=>window.scrollTo(0,0));
  const boxes=[];
  for(const target of targets) boxes.push(await rect(page,target));
  const anchors=[];
  for(const mark of marks) anchors.push(await rect(page,mark));
  const dims=await page.evaluate(()=>({
    width:Math.max(document.documentElement.scrollWidth,innerWidth),
    height:Math.max(document.documentElement.scrollHeight,innerHeight)
  }));
  const pad=options.pad??14;
  const left=Math.max(0,Math.floor(Math.min(...boxes.map(b=>b.x))-pad));
  const top=Math.max(0,Math.floor(Math.min(...boxes.map(b=>b.y))-pad));
  const right=Math.min(dims.width,Math.ceil(Math.max(...boxes.map(b=>b.x+b.w))+pad));
  const bottom=Math.min(dims.height,Math.ceil(Math.max(...boxes.map(b=>b.y+b.h))+pad));
  const width=right-left,height=bottom-top;
  if(width<1||height<1) throw Error('Invalid capture '+name);
  const png=await page.screenshot({fullPage:!options.fixed,animations:'disabled',scale:'css'});
  const pngMeta=await sharp(png).metadata();
  await sharp(png).extract({left,top,width:Math.min(width,pngMeta.width-left),height:Math.min(height,pngMeta.height-top)})
    .jpeg({quality:93,mozjpeg:true}).toFile(path.join(out,name+'.jpg'));
  screenshots[name]={width,height,marks:anchors.map((a,i)=>({
    number:i+1,x:(a.x-left)/width,y:(a.y-top)/height,w:a.w/width,h:a.h/height
  }))};
  fs.writeFileSync(path.join(out,'captures.json'),JSON.stringify(screenshots,null,2));
  console.log(name,width,height,anchors.length);
}
async function go(page, route){await page.goto(localhost+route,{waitUntil:'load'});}
async function fill(page, pairs) {
  for(const [selector,value] of pairs) await page.locator(selector).fill(value);
}
async function narrowField(page, id, value) { await page.locator(id).fill(value); }
async function section(name,fn){
  try{await fn();}catch(error){console.error(name+'\n'+String(error).split('\n').slice(0,12).join('\n'));process.exitCode=1;}
}
(async()=>{
  const browser=await chromium.launch({
    executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true
  });
  const [general, page]=await fixtureContext(browser);
  const [phone, mobile]=await fixtureContext(browser,{mobile:true});
  const [admins, admin]=await fixtureContext(browser,{admin:true});
  page.on('dialog',d=>d.accept());
  admin.on('dialog',d=>d.accept());
  try{
    await section('Home',async()=>{
      await go(page,'/');
      await shot('home',page,['.important-dates-ticker','.homepage-wrap'],[
        '.ticker-calendar-link','.public-tools','.homepage-admin > summary'
      ]);
      await shot('cover',page,['.fbp-hero','.public-tools']);
      await go(mobile,'/');
      await shot('home-phone',mobile,['.fbp-hero','.public-tools'],['.public-tools .tool-card-toggle']);
      await shot('install-phone',mobile,['.fbp-hero','.public-tools']);
      await page.locator('.homepage-admin summary').click();
      await shot('home-admin',page,['.homepage-admin'],['.homepage-admin a[href*="MyExams"]','.homepage-admin a[href*="MyRoster"]']);
    });
    await section('Aircraft',async()=>{
      await go(page,'/MyAircraft/index.html');
      await page.locator('#aircraftFamilySelect option', {hasText:'A350'}).waitFor({state:'attached'});
      await shot('aircraft-find',page,['.fbp-hero','.briefing-controls'],['#aircraftFamilySelect','#registrationInput']);
      await page.locator('#aircraftFamilySelect').selectOption({label:'A350'});
      await page.locator('.meta-panel').waitFor({state:'visible'});
      await shot('aircraft-summary',page,['.meta-panel'],['.meta-panel h2']);
      const position=page.locator('button.position-hotspot').first();
      if(await position.count()) await position.click({force:true});
      else await page.locator('#seatLayer button').first().click();
      await page.locator('#positionPanel').waitFor({state:'visible'});
      await shot('aircraft-position',page,['#positionPanel'],['#positionPanel h2']);
      await shot('aircraft-diagram',page,['#summaryStats',position],[
        position
      ],{pad:24});
      const documents=page.getByText('Delivery Standards',{exact:true});
      if(await documents.first().isVisible())
        await shot('aircraft-links',page,['#summaryStats'],[page.getByText('BA AOR Diagrams',{exact:true}),documents]);
    });
    await section('Briefing hub',async()=>{
      await go(page,'/MyBriefing/index.html');
      await shot('briefing-hub',page,['.fbp-hero','#fdp-grid'],['[data-type=longhaul]','[data-type=shorthaul]']);
      await go(mobile,'/MyBriefing/index.html');
      await shot('briefing-phone',mobile,['.fbp-hero','#fdp-grid'],['[data-type=longhaul]','[data-type=shorthaul]']);
    });
    await section('Longhaul and presentation',async()=>{
      await go(page,'/MyBriefing/longhaul.html');
      await fill(page, [['#flightDate','2026-11-27'],['#flightNumber','BA9001'],['#from','LHR'],['#to','JFK'],
        ['#sccm','Demo Lead'],['#asccm','Demo Checker'],['#captainName','Demo Captain'],['#firstOfficerNames','Demo First Officer']]);
      await page.locator('#lhrTerminal').selectOption('T5');
      const aircraftOptions=await page.locator('#aircraftType option').evaluateAll(items=>items.map(o=>({label:o.label,value:o.value})));
      const type=aircraftOptions.find(o=>o.value==='351'||o.label.includes('351'));
      if(!type) throw Error('A350 fixture unavailable');
      await page.locator('#aircraftType').selectOption(type.value);
      await fill(page,[['#depHour','15'],['#depMinute','00'],['#reportHour','13'],['#reportMinute','30'],['#absHour','07'],['#absMinute','30']]);
      if(!(await page.locator('#lastArrHour').inputValue())) await fill(page,[['#lastArrHour','22'],['#lastArrMinute','30']]);
      await shot('longhaul-top',page,['#flightDate','#lhrTerminal','#firstOfficerNames','#aircraftType','#numSectors'],['#flightDate','#lhrTerminal','#aircraftType'],{pad:23});
      await shot('longhaul-time',page,['#depHour','#lastArrMinute','#moreOptionsToggle','#calcBtn'],['#depHour','#reportHour','#absHour','#calcBtn'],{pad:26});
      await page.locator('#briefingDetailsToggle').click();
      await page.locator('#moreOptionsToggle').click();
      await shot('longhaul-options',page,['#briefingDetailsToggle','#briefingDetailsSection','#moreOptionsToggle','#moreOptionsSection'],['#briefingDetailsToggle','#moreOptionsToggle','#revDepHour']);
      await page.locator('#calcBtn').click();
      if(!(await page.locator('#buildBriefingBtn').isVisible())) throw Error('Calculator did not produce hand-off: '+await page.locator('#errorBox').innerText());
      await shot('longhaul-results',page,['.results-heading','#resultsBox1','#resultsBox2','#resultsBox3'],['#resultsBox2','#resultsBox3']);
      await shot('longhaul-actions',page,['#buildBriefingBtn','#standbyCalcRow','#emailResultsRow'],['#buildBriefingBtn','#standbyReportHour','#emailResults']);
      await page.locator('#buildBriefingBtn').click();
      await page.waitForURL('**/MyBriefingPresentation/**');
      await shot('presentation-gate',page,['.gatebox'],['#code','#genericBriefing']);
      await page.locator('#genericBriefing').click();
      await page.locator('#form').waitFor({state:'visible'});
      await shot('presentation-setup',page,['#setup > h1','#form > .card:first-of-type'],[
        '#fdpNotice','#form [name=aircraft]','#form [name=gate]'
      ]);
      const customer=page.locator('#form > .card').filter({hasText:'Customer Profile'}).first();
      await shot('presentation-customer',page,[customer],[
        customer.getByText('Passenger Loads',{exact:true}),customer.locator('textarea').first()
      ]);
      await page.setViewportSize({width:1030,height:620});
      await page.locator('#form button[type=submit]').click();
      await page.locator('#deck').waitFor({state:'visible'});
      await shot('presentation-deck',page,['#deck'],['#next','#full','#edit'],{fixed:true,pad:0});
      await page.locator('#mapBtn').click();
      await page.locator('#mapScreen').waitFor({state:'visible'});
      await shot('presentation-map',page,['#mapScreen'],['#mapBack'],{fixed:true,pad:0});
      await page.setViewportSize({width:1080,height:900});
    });
    await section('Shorthaul',async()=>{
      await go(page,'/MyBriefing/shorthaul.html');
      await shot('shorthaul',page,['#flightDate','#numSectors','#from','#to','#depHour','#lastArrHour','#calcBtn'],['#numSectors','#to','#moreOptionsToggle']);
    });
    await section('MyASBY',async()=>{
      await go(page,'/MyDocuments/report-times.html');
      await shot('asby',page,['.report-times-status','.report-times-list'],[
        '#reportTimesSearch','#reportTimesFilter','#reportTimesTerminal','#reportTimesFleet'
      ]);
      await mobile.setViewportSize({width:400,height:820});
      await go(mobile,'/MyDocuments/report-times.html');
      assert.equal(await mobile.locator('#reportTimesFilters').evaluate(el=>el.open),false);
      await shot('asby-phone',mobile,['.report-times-status','.report-times-list'],[
        '#reportTimesFilters summary','.report-times-table-wrap'
      ]);
      await mobile.getByText('Filters',{exact:true}).tap();
      await shot('asby-expanded',mobile,['#reportTimesFilters'],[
        '#reportTimesSearch','#reportTimesFilter','#reportTimesTerminal','#reportTimesFleet'
      ]);
    });
    await section('Documents',async()=>{
      await go(page,'/MyDocuments/index.html');
      await shot('documents',page,['.documents-section'],[
        '.document-card:first-of-type .document-actions','a[href="report-times.html"]','.docunet-app-link'
      ]);
      await go(mobile,'/MyDocuments/index.html');
      await shot('documents-phone',mobile,['.documents-section'],[
        '.document-card:first-of-type .document-actions','a[href="report-times.html"]','.docunet-app-link'
      ]);
    });
    await section('Calendar',async()=>{
      await go(page,'/ImportantDates/index.html');
      await shot('calendar-wide',page,['.important-date-legend','.important-month:first-child'],[
        '.important-date-legend','.important-month [data-date="2026-11-27"]'
      ]);
      await go(mobile,'/ImportantDates/index.html');
      await mobile.locator('[data-date="2026-11-27"]').tap();
      await shot('calendar-phone',mobile,['.calendar-mobile-hint','.important-month:first-child'],[
        '[data-date="2026-11-27"]','.important-month:first-child .calendar-selected-events'
      ]);
    });
    await section('Admin access',async()=>{
      await go(page,'/MyExams/index.html');
      await shot('access',page,['.access-card'],['#fbp-access-feedback']);
    });
    await section('Exams',async()=>{
      await go(admin,'/MyExams/index.html');
      await admin.locator('#subject').selectOption('General');
      await shot('exams-start',admin,['#setup'],['#subject','#exam-length','#start']);
      await admin.locator('#start').click();
      await admin.locator('#options label').first().click();
      await shot('exams-answer',admin,['#exam'],['#options','#next']);
      await admin.locator('#next').click();
      await shot('exams-reveal',admin,['#exam'],['#feedback','#next']);
      await admin.locator('#next').click();
      for(let i=1;i<10;i++){
        await admin.locator('#options label').first().click();
        await admin.locator('#next').click();
        await admin.locator('#next').click();
      }
      await admin.locator('#review-button').waitFor({state:'visible'});
      await shot('exams-results',admin,['#results'],['#score','#review-button']);
      await admin.locator('#review-button').click();
      await shot('exams-review',admin,['#review-title','.review-item'],['.review-item .memory-cue']);
    });
    await section('Roster',async()=>{
      await go(admin,'/MyRoster/index.html');
      await admin.locator('#openCrewlinkBtn').click();
      await shot('roster-import',admin,['.myroster-card:first-of-type'],['.file-label','#openCrewlinkBtn','#pastedRosterText']);
      await admin.locator('.planning-options summary').click();
      await admin.locator('#addFutureDutyBtn').click();
      const duty=admin.locator('.future-duty-type').first();
      await duty.selectOption('ANNUAL_LEAVE');
      await admin.locator('.future-duty-date').fill('2026-12-08');
      await admin.locator('.future-duty-end-date').fill('2026-12-12');
      await shot('roster-planning',admin,['.planning-options'],['#contractType','.future-duty-type','#addFutureDutyBtn']);
      await admin.locator('#refreshBtn').click();
      await admin.locator('#rosterPreviewSection').waitFor({state:'visible'});
      await shot('roster-preview',admin,['#rosterPreviewSection'],['#searchBox','#typeFilter','#previewBody']);
      await shot('roster-export',admin,[admin.locator('.myroster-card').filter({has:admin.locator('#postParseActions')}).first()],['#downloadBtn','#clearHistoryBtn']);
      const downloadPromise=admin.waitForEvent('download');
      await admin.locator('#downloadBtn').click();
      const download=await downloadPromise;
      const file=await download.path();
      if(!fs.readFileSync(file,'utf8').includes('BEGIN:VEVENT')) throw Error('Roster download missing demo event');
      console.log('Roster .ics download validated');
    });

    await section('Responsive site checks',async()=>{
      for(const width of [320,390,650]){
        await mobile.setViewportSize({width,height:812});
        await go(mobile,'/MyDocuments/index.html');
        const cards=await mobile.locator('.document-card').evaluateAll(els=>els.map(el=>{
          const card=el.getBoundingClientRect();
          return {x:card.x,y:card.y,end:card.right,contentFits:el.scrollWidth===el.clientWidth};
        }));
        assert.equal(cards.length,8);
        assert.equal(cards[0].y,cards[1].y);
        assert.ok(cards[1].x>cards[0].x&&cards[2].y>cards[0].y);
        assert.ok(cards.every(card=>card.end<=width&&card.contentFits));
        await go(mobile,'/MyBriefing/index.html');
        const both=await mobile.locator('.fdp-choice').evaluateAll(els=>els.map(el=>{
          const r=el.getBoundingClientRect();
          return {x:r.x,y:r.y,end:r.right,width:r.width};
        }));
        assert.equal(both[0].y,both[1].y);
        assert.ok(both[1].x>both[0].x&&both[1].end<=width);
        const note=await mobile.locator('.fdp-note').evaluate(el=>{
          const style=getComputedStyle(el);
          const range=document.createRange();
          range.selectNodeContents(el);
          return {lines:range.getClientRects().length,fontSize:parseFloat(style.fontSize)};
        });
        assert.ok(note.lines===2&&note.fontSize>=13,JSON.stringify([width,note]));
        await go(mobile,'/MyDocuments/report-times.html');
        const summary=mobile.locator('#reportTimesFilters summary');
        const table=mobile.locator('.report-times-table-wrap');
        const search=mobile.locator('#reportTimesSearch');
        const isExpanded=()=>mobile.locator('#reportTimesFilters').evaluate(el=>el.open);
        assert.equal(await isExpanded(),false);
        assert.equal(await search.isVisible(),false);
        assert.equal(await mobile.locator('#reportTimesRows tr').count(),5);
        const compact=(await table.boundingBox()).y;
        await summary.tap();
        assert.equal(await isExpanded(),true);
        assert.ok((await table.boundingBox()).y>compact+140);
        await search.fill('MAD');
        assert.equal(await mobile.locator('#reportTimesRows tr').count(),1);
        await summary.tap();
        assert.equal(await isExpanded(),false);
        assert.equal(await mobile.locator('#reportTimesRows tr').count(),1);
      }
      await page.setViewportSize({width:1200,height:900});
      await go(page,'/MyDocuments/report-times.html');
      assert.equal(await page.locator('#reportTimesFilters').evaluate(el=>el.open),true);
      assert.equal(await page.locator('#reportTimesFilters summary').isVisible(),false);
      assert.equal(await page.locator('#reportTimesSearch').isVisible(),true);
      await page.setViewportSize({width:390,height:812});
      await page.locator('#reportTimesFilters summary').waitFor({state:'visible'});
      assert.equal(await page.locator('#reportTimesFilters').evaluate(el=>el.open),false);
      await page.setViewportSize({width:1200,height:900});
      await page.locator('#reportTimesSearch').waitFor({state:'visible'});
      console.log('Responsive layouts verified at 320, 390, 650, and 1200 CSS pixels');
    });
    console.log('CAPTURE TOTAL',Object.keys(screenshots).length,'PAGE ERRORS',errors);
  }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
