(function(){
  const schedules=globalThis.REPORT_TIME_SCHEDULES||[];
  const weekdays={Monday:1,Tuesday:2,Wednesday:3,Thursday:4,Friday:5,Saturday:6,Sunday:7};
  const timeParts=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/London",weekday:"long",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"});
  const dateDisplay=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/London",weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const clockDisplay=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/London",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23",timeZoneName:"short"});
  const esc=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  const search=document.getElementById("reportTimesSearch"),filter=document.getElementById("reportTimesFilter"),terminalFilter=document.getElementById("reportTimesTerminal"),fleetFilter=document.getElementById("reportTimesFleet");
  const filterPanel=document.getElementById("reportTimesFilters");
  const compactFilters=window.matchMedia("(max-width: 650px)");
  const updateFilterPanel=({matches})=>{filterPanel.open=!matches;};
  updateFilterPanel(compactFilters);
  compactFilters.addEventListener("change",updateFilterPanel);

  let todaysFlights=[],nowMinute=0;
  function londonNow(){
    const parts=Object.fromEntries(timeParts.formatToParts(new Date()).map(part=>[part.type,part.value]));
    const iso=parts.year+"-"+parts.month+"-"+parts.day;
    return {iso,weekday:weekdays[parts.weekday],minute:Number(parts.hour)*60+Number(parts.minute)};
  }
  function scheduleFor(iso){
    return schedules.find(item=>(!item.validFrom||iso>=item.validFrom)&&(!item.validThrough||iso<=item.validThrough))||null;
  }
  function render(){
    const now=londonNow(),schedule=scheduleFor(now.iso);
    nowMinute=now.minute;
    document.getElementById("reportTimesClock").textContent=clockDisplay.format(new Date())+" · London";
    document.getElementById("reportTimesToday").textContent=dateDisplay.format(new Date());
    const scheduleText=document.getElementById("reportTimesSchedule"),body=document.getElementById("reportTimesRows");
    if(!schedule){
      todaysFlights=[];scheduleText.textContent="No report-time guide is available for this date.";body.innerHTML="";
      document.getElementById("reportedCount").textContent="0";document.getElementById("remainingCount").textContent="0";
      document.getElementById("reportTimesEmpty").hidden=false;return;
    }
    todaysFlights=schedule.rows.filter(row=>!row.days||row.days.includes(now.weekday)).map(row=>({...row,reported:Number(row.time.slice(0,2))*60+Number(row.time.slice(3))<=nowMinute}));
    scheduleText.textContent=schedule.label+" report-time guide · London time";
    const aircraftReview=document.getElementById("reportTimesAircraftReview");
    const reviewRows=schedule.rows.filter(row=>!row.aircraft&&row.aircraftCode);
    const reviewItems=[...new Map(reviewRows.map(row=>[row.aircraftCode,row.aircraftCode+" ("+row.flight+" "+row.destination+")"])).values()];
    aircraftReview.hidden=reviewItems.length===0;
    aircraftReview.textContent=reviewItems.length?"Aircraft codes to check: "+reviewItems.join("; ")+". Their aircraft type is left blank until confirmed.":"";
    const reported=todaysFlights.filter(row=>row.reported).length;
    document.getElementById("reportedCount").textContent=String(reported);
    document.getElementById("remainingCount").textContent=String(todaysFlights.length-reported);
    drawRows();
  }
  function matchesFleetSelection(row,value){
    if(value==="all")return true;
    const families=row.fleetFamilies||[];
    if(row.aircraft==="Shorthaul")return true;
    if(!families.length)return false;
    if(value==="B777-B787-A380")return families.every(family=>["B777","B787","A380"].includes(family));
    if(value==="B777-B787-A350")return families.every(family=>family!=="A380");
    if(value==="B777-B787")return families.every(family=>["B777","B787"].includes(family));
    if(value==="B777-only")return row.aircraft==="B777";
    return true;
  }
  function drawRows(){
    const query=search.value.trim().toLowerCase(),selected=filter.value;
    const shown=todaysFlights.filter(row=>{
      const matchesText=!query||[row.flight,row.destination,row.terminal,row.aircraft,row.aircraftCode].some(value=>String(value||"").toLowerCase().includes(query));
      const matchesStatus=selected==="all"||(selected==="reported"&&row.reported)||(selected==="upcoming"&&!row.reported);
      const matchesTerminal=terminalFilter.value==="all"||row.terminal===terminalFilter.value;
      const matchesFleet=matchesFleetSelection(row,fleetFilter.value);
      return matchesText&&matchesStatus&&matchesTerminal&&matchesFleet;
    });
    document.getElementById("reportTimesRows").innerHTML=shown.map(row=>"<tr><td><time datetime=\""+esc(row.time)+"\">"+esc(row.time)+"</time></td><td>"+esc(row.flight)+"</td><td>"+esc(row.destination)+"</td><td>"+esc(row.aircraft||"")+"</td><td>"+esc(row.terminal)+"</td><td><span class=\"report-status report-status-"+(row.reported?"reported":"upcoming")+"\">"+(row.reported?"Reported":"Still to report")+"</span></td></tr>").join("");
    document.getElementById("reportTimesEmpty").hidden=shown.length>0;
  }
  search.addEventListener("input",drawRows);filter.addEventListener("change",drawRows);terminalFilter.addEventListener("change",drawRows);fleetFilter.addEventListener("change",drawRows);
  render();window.setInterval(render,20000);
})();
