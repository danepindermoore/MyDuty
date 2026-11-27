SITE = "https://danepindermoore.github.io/MyDuty/"
APPLE = "https://support.apple.com/en-az/guide/iphone/iphea86e5236/26/ios/26"
GOOGLE_SHORTCUT = "https://support.google.com/chrome/answer/15085120?co=GENIE.Platform%3DAndroid&hl=en-GB"
GOOGLE_INSTALL = "https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en-GB"
APPLE_CALENDAR = "https://support.apple.com/en-mide/guide/calendar/icl1023/mac"

def s(file, label, height, crop=None):
    return (file, label, height, crop)

CONTENTS = [
 ("GETTING STARTED", [
  ("overview","MyDuty at a glance",2),
  ("home","Home and navigation",4),
  ("iphone","Add MyDuty to iPhone",5),
  ("android","Add MyDuty to Android",6),
 ]),
 ("CREW TOOLS", [
  ("aircraft","MyAircraft",7),
  ("briefing","MyBriefing",9),
  ("longhaul","Longhaul FDP",10),
  ("shorthaul","Shorthaul FDP",13),
  ("presentation","Pre-flight briefing",14),
  ("asby","MyASBY",17),
  ("documents","MyDocuments",18),
  ("calendar","MyCalendar",19),
 ]),
 ("ADMIN AND SUPPORT", [
  ("exams","MyExams",20),
  ("roster","MyRoster",22),
  ("help","Help and glossary",24),
 ]),
]

PAGES = [
 ("home","START HERE","Home and navigation","home","Start on Home and choose the tool for the task in front of you.","Home","",[
  ("screen",s("home","A   •   Home on a larger screen",343)),
  ("steps",[
   ("Important Dates","Open the ticker link to see the current and following month in <b>MyCalendar</b>."),
   ("Crew tool tiles","Tap the tool name to open it. On a phone, tap a tile’s chevron to read its description first."),
   ("Admin","Expand <b>Admin</b> for <b>MyExams</b> and <b>MyRoster</b>. The admin pages show an access prompt if your session does not have access."),
  ]),
  ("note","back","Finding your way back","Use <b>Home</b> in the navigation where available, or use your browser’s Back button. The navigation buttons wrap on smaller screens."),
 ]),
 ("iphone","PHONE SETUP","Add MyDuty to iPhone","phone","Put MyDuty on your Home Screen so it opens from its own icon.",None,None,[
  ("platform","iphone"),
  ("note","help","If Share looks different","In some Safari layouts, tap the page menu first and then <b>Share</b>. If <b>Add to Home Screen</b> is missing, look under <b>Edit Actions</b> near the bottom of the share sheet."),
  ("link","Apple Support  ·  Turn a website into an app in Safari",APPLE),
 ]),
 ("android","PHONE SETUP","Add MyDuty to Android","phone","Keep a MyDuty shortcut on your home screen for quick access in Chrome.",None,None,[
  ("platform","android"),
  ("note","help","If your Chrome menu uses a different label","Look for <b>Add to Home screen</b> or <b>Install app</b>. If Chrome offers <b>Install</b>, follow the prompts. A Chrome badge on the shortcut means it opens in the browser. Use an internet connection for MyDuty and its linked services."),
  ("link","Chrome Help  ·  Create a website shortcut",GOOGLE_SHORTCUT),
  ("link","Chrome Help  ·  Install a web app",GOOGLE_INSTALL),
 ]),
 ("aircraft","CREW TOOL","MyAircraft","plane","Find your aircraft by registration or start with the aircraft family and variant.","Home  /  MyAircraft","MyAircraft/index.html",[
  ("screen",s("aircraft-find","A   •   The two ways to look up an aircraft",160)),
  ("steps",[
   ("Choose a family","Select A350, A380, B777, B787 or A320 Family. Then select the relevant variant, registration range or deck if prompted."),
   ("Enter the registration","Type the four characters after <b>G-</b>. The tool looks up the aircraft as you type. Read the confirmation before using the details."),
  ]),
  ("screen",s("aircraft-diagram","B   •   The top of a supported aircraft layout",137)),
  ("note","plane","Select the numbered position","On a supported diagram, tap the marker shown at <b>B1</b>. Check the aircraft heading, variant and deck first. Use <b>Back to Aircraft Types</b> to start a new search."),
 ]),
 ("aircraft-detail","CREW TOOL  /  MYAIRCRAFT","Read the aircraft view","plane","Use the aircraft summary for an overview and the position panel for the selected position.",None,None,[
  ("pair",s("aircraft-summary","A   •   Aircraft Summary",184,(0,0,1,.53)),s("aircraft-position","B   •   Position Briefing",184,(0,0,1,.57))),
  ("duo",[
   ("A  ·  Aircraft Summary","Review cabin and seat configuration, rest facilities and Wi-Fi where listed. A type-only selection may show generic information."),
   ("B  ·  Position Briefing","Read the headings for the selected position. Tap an equipment chip to expand its name and location when available."),
  ]),
  ("screen",s("aircraft-links","C   •   Official BA references in the aircraft view",65)),
  ("duo",[
   ("C1  ·  BA AOR Diagrams","Open the official aircraft layout reference when listed. DocuNet links may open the app or a browser copy."),
   ("C2  ·  Delivery Standards","Open the relevant DocuNet section from here when a link is provided."),
  ]),
  ("note","check","Check the current aircraft reference","Some aircraft or positions have limited information. MyDuty flags unavailable interactive mapping for A380 and single-aisle aircraft. Use the current BA reference for operational checks."),
 ]),
 ("briefing","CREW TOOL","MyBriefing","brief","Choose a duty tool. Longhaul opens the calculator. Shorthaul is shown as in development.","Home  /  MyBriefing","MyBriefing/index.html",[
  ("pair",s("briefing-hub","A   •   Larger screen",155),s("briefing-phone","B   •   Phone",243)),
  ("steps",[
   ("Longhaul","Tap or click <b>Longhaul</b> to open the calculator. Use the next chapter to enter a duty and review the results."),
   ("Shorthaul","The disabled tile carries the development note. On a phone, both tiles sit side by side so you can see the available choice straight away."),
  ]),
  ("note","check","Have your duty details ready","Check the date, route, aircraft, terminal, report and scheduled times against the current BA sources. Keep the applicable station brief handy if you need inbound pick-up details."),
 ]),
 ("longhaul","CREW TOOL  /  MYBRIEFING","Longhaul FDP","clock","Enter the duty, check the time basis and calculate. The results pages explain how to read and share the output.","Home  /  MyBriefing  /  Longhaul","MyBriefing/longhaul.html",[
  ("screen",s("longhaul-top","A   •   Duty, crew and aircraft fields  /  Example data",207)),
  ("steps",[
   ("Date and route","Set the date and flight number. Use three-letter departure and destination codes."),
   ("Heathrow terminal","Choose <b>T3</b> or <b>T5</b> for an LHR departure."),
   ("Crew, aircraft and sectors","Enter the SCCM and acting SCCM. Add captain and first officer details if available and separate multiple names with commas. Enter an optional registration or select <b>Aircraft Type</b>, then check <b>Number of Sectors</b>."),
  ]),
  ("note","clock","Keep local time and GMT separate","The input labels show which clock to use. The auto-filled report and arrival values can be edited. Check them against your roster and flight sources."),
 ]),
 ("longhaul-times","CREW TOOL  /  LONGHAUL FDP","Enter times and options","clock","Use the boxes for hours and minutes. Open the optional sections only when you have relevant information to add.",None,None,[
  ("screen",s("longhaul-time","A   •   Time inputs and Calculate  /  Example data",226)),
  ("steps",[
   ("Local departure","Enter the scheduled local departure and check <b>Acclimatised at</b>. The default is LHR. Select <b>Unknown</b> if appropriate."),
   ("Report time and rest","Review the local report time and the available rest facility."),
   ("Flight and arrival","Use the source named on screen for <b>Flight Time</b> and review <b>Arrival Time</b> in GMT. Check any prefilled value."),
   ("Calculate","Fix highlighted fields or respond to the missing acting SCCM prompt. <b>Clear Form</b> resets the inputs and outputs."),
  ]),
  ("note","settings","Briefing Details and More Options","When available, <b>Briefing Details</b> takes inbound STD and the pick-up offset from the station brief. <b>More Options</b> contains the delay, actual flight time, service, landing and crew fields. Recalculate and read the route notes after changes."),
 ]),
 ("longhaul-results","CREW TOOL  /  LONGHAUL FDP","Read, share and brief","clock","Check result labels and route notes before sharing figures or opening the presentation.",None,None,[
  ("screen",s("longhaul-results","A   •   Rest, FDP and chocks results  /  Example figures",203,(0,.47,1,1))),
  ("duo",[
    ("A1  ·  Limits and rest","Review maximum FDP, rest and flight time. Review the preceding summary for rostered duty and ETA."),
    ("A2  ·  Chocks and take-off","Check the latest on-chocks time in Zulu and destination-local time, and the off-chocks and take-off limits where shown."),
  ]),
  ("screen",s("longhaul-actions","B   •   Actions shown after a successful calculation",137)),
  ("steps",[
    ("Build Pre-Flight Briefing","Appears after successful LHR or LGW calculations. Open it to carry the estimates into the briefing setup."),
    ("Airport standby","For LHR duties, enter the affected crew member’s LHR-local report time and use the separate <b>Calculate</b> button."),
    ("Email Results","Enter the requested staff numbers to open a draft. Check the recipients and the content in your mail app before sending."),
  ]),
 ]),
 ("shorthaul","CREW TOOL  /  DEVELOPMENT","Shorthaul FDP","clock","Shorthaul FDP is in development. Its tile in MyBriefing is disabled.",None,None,[
  ("screen",s("shorthaul","A   •   Development page, shown for orientation",255)),
  ("steps",[
   ("Number of Sectors","The development form asks for the date, number of sectors and first departure airport."),
   ("Today’s Last Sector Arrival Airport","The destination field is for the final sector of that duty."),
   ("More Options","This section contains conditional timing fields. The draft page also includes calculation, standby and email-result controls."),
  ]),
  ("note","check","For current short-haul duties","Use the approved BA process for FDP. The screenshot is included so readers can distinguish the development page from the available long-haul tool."),
 ]),
 ("presentation","CREW TOOL  /  BRIEFING","Pre-flight briefing","brief","Start from a successful Longhaul FDP calculation so the session can carry the flight details across.",None,None,[
  ("pair",s("presentation-gate","A   •   Choose a briefing profile",228),s("presentation-setup","B   •   Prefilled setup  /  Example",228,(0,0,1,.48))),
  ("duo",[
   ("A1  ·  Personalised briefing","If a profile is set up for you, enter the last four digits of your work device phone number and tap <b>Continue</b>."),
   ("A2  ·  Generic Briefing","If you have no personalised profile, tap <b>Generic Briefing</b>."),
  ]),
  ("duo",[
   ("B1  ·  FDP details received","Look for the confirmation. Keep the same browser session when moving from Results to the builder."),
   ("B2  ·  Aircraft and route","Check the prefilled flight, aircraft variant, crew, rest and times. Confirm the aircraft registration and add the applicable gate and station details."),
  ]),
  ("note","back","When details are missing","Return to Longhaul FDP and launch the builder from <b>Build Pre-Flight Briefing</b>. The form can be checked and edited before you create the deck."),
 ]),
 ("presentation-input","CREW TOOL  /  BRIEFING","Prepare the discussion","brief","Complete the information relevant to this crew and this flight. Review the form before creating the presentation.",None,None,[
  ("screen",s("presentation-customer","A   •   Customer Profile & Cabin Service fields",299,(0,.035,1,.74))),
  ("steps",[
   ("Passenger Loads","Add the counts by cabin, plus applicable infants, additional needs and other loads the form requests. Cabin fields depend on the aircraft."),
   ("Customer and service notes","Use the relevant fields for allergies, other passenger information, staff and service. Add only the information needed for the briefing."),
  ]),
  ("splittext",[
   ("Flight-specific discussion","Enter the applicable OMN, route and station notes. Review the SCCM expectations and any prefilled timings in the wider form."),
   ("Create the presentation","Tap <b>Create Long Haul briefing</b>. If creation stops, review the entries and try again. Keep the tab open for presentation."),
  ]),
  ("note","shield","Keep information on the appropriate device","The examples in this booklet use fictional flight and crew details. Use current BA sources and keep live briefing information private."),
 ]),
 ("presentation-run","CREW TOOL  /  BRIEFING","Present the deck","brief","Review the deck before presenting. The toolbar, route map and interactive slides remain available from the presentation view.",None,None,[
  ("screen",s("presentation-deck","A   •   Presentation toolbar and cover slide  /  Example data",252)),
  ("steps",[
   ("Next and Back","Move through the slides. Follow the slide counter and use the timer when a finish time is shown."),
   ("Full screen","Open the dedicated view if supported. Use <b>Flight route</b> to open the illustrative route map and its return control to come back."),
   ("Edit","Return to the form, correct the information, then create the deck again."),
  ]),
  ("note","tap","Interact with the slide","Tap numbered working positions or highlighted sections when available. On a sequence slide, <b>Tap to continue</b> reveals the next panel. The code area shown in the example is an illustration."),
 ]),
 ("asby","CREW TOOL","MyASBY","clock","See today’s scheduled report times in London time and narrow the list only when you need to.","Home  /  MyASBY","MyDocuments/report-times.html",[
  ("pair",s("asby-phone","A   •   Phone on first load  /  Example",261),s("asby-expanded","B   •   Filters expanded",261)),
  ("duo",[
   ("A1  ·  Filters","The section starts closed on a small screen. Tap once to show all controls and tap again to put the list back higher on the page."),
   ("A2  ·  Flight list","Start with upcoming flights. Read report time, flight, destination and the other columns. On a narrow phone, swipe across the table for the remaining columns."),
  ]),
  ("duo",[
   ("B1–B2  ·  Search and Flights","Type a flight number or destination. Use <b>Flights</b> for all, reported or still to report."),
   ("B3–B4  ·  Terminal and Fleet","Narrow to the terminal or fleet you need. Clear the search and widen the selections if a flight disappears. Short-haul rows can still appear under a fleet filter."),
  ]),
  ("note","clock","What Reported means","The status is based on the time in the published guide and the London clock. Confirm actual assignment and any schedule change via the usual BA channels. A blank aircraft type can mean the code is awaiting confirmation."),
 ]),
 ("documents","CREW TOOL","MyDocuments","file","Open crew forms, seasonal report times and links into DocuNet.","Home  /  MyDocuments","MyDocuments/index.html",[
  ("pair-right",s("documents","A   •   Document library on a larger screen",215),s("documents-phone","B   •   Two cards per row on a phone",310)),
  ("steps",[
   ("Open a PDF","Tap <b>Open</b> on the document card. Use the viewer to save, print or share where available. Examples include the crew break template, baggage manifest, meal order form and India SPML template."),
   ("Open guide or Standby view","Use the seasonal Report Times card to open the guide or go straight to MyASBY."),
   ("Open a DocuNet link","Allow the app to open if prompted, or sign in to the browser version using your usual BA access. If a tab was blocked, open DocuNet directly."),
  ]),
 ]),
 ("calendar","CREW TOOL","MyCalendar","calendar","See pay, bidding, roster and annual leave dates for this month and next.","Home  /  Important Dates","ImportantDates/index.html",[
  ("pair",s("calendar-wide","A   •   Wider calendar view  /  Example",229),s("calendar-phone","B   •   A marked day selected",252)),
  ("duo",[
   ("A1  ·  The legend","Use the three categories to identify the events shown in the month."),
   ("A2  ·  The wider view","Turn your phone to landscape for more room. If it does not rotate, check the phone’s rotation lock."),
  ]),
  ("duo",[
   ("B1  ·  Tap a marked day","On a small phone, choose a date with a coloured marker. With a keyboard, focus the date and press Enter or Space."),
   ("B2  ·  Read below the month","Check the event name, detail and time if listed. Read any pending annual-leave note and confirm deadlines against the current BA notice."),
  ]),
 ]),
 ("exams","ADMIN TOOL","MyExams","study","Set up a practice exam, pick your answers and reveal them as you go.","Home  /  Admin  /  MyExams","MyExams/index.html",[
  ("pair",s("exams-start","A   •   Start an exam  /  Example question bank",219),s("exams-answer","B   •   Choose one answer",219)),
  ("duo",[
   ("A1–A2  ·  Subject and length","Choose a fleet or a subject such as AvMed, Security or General, or use <b>Mixed revision - all subjects</b>. The length options depend on what is available."),
   ("A3  ·  Start exam","Begin when ready. The practice set has no time limit. Items marked as awaiting verification are kept out of the active question pool."),
  ]),
  ("duo",[
   ("B1  ·  Pick an answer","Select one option. You can change your selection until you reveal it."),
   ("B2  ·  Reveal answer","The choice is locked when revealed. After reading the feedback, choose <b>Next question</b> or <b>Finish exam</b> on the last question."),
  ]),
  ("note","lock","Access and purpose","Open via <b>Admin</b> on Home and request access if prompted. Use the tool for revision alongside current BA training material. The example questions shown in this guide are written for illustration."),
 ]),
 ("exams-result","ADMIN TOOL  /  MYEXAMS","Review what you missed","study","Use the feedback on each question, then review the result and memory cues.",None,None,[
  ("pair",s("exams-reveal","A   •   Revealed response  /  Example",211),s("exams-results","B   •   Result  /  Example score",211)),
  ("duo",[
   ("A1–A2  ·  Feedback and navigation","Read the feedback, move to the next question, or use <b>Previous</b> to revisit a revealed answer. <b>End exam</b> closes an unfinished attempt."),
   ("B1–B2  ·  Score and review","The screen shows the percentage and correct count. Single-subject practice applies the site’s pass indicator. Open <b>Review incorrect answers</b> for feedback and memory cues."),
  ]),
  ("screen",s("exams-review","C   •   Review and memory cue  /  Example",181)),
  ("note","check","Review again later","Completed results appear under <b>Recent results on this device</b>. Use <b>Clear revision history</b> to remove local history or return to setup for another practice set."),
 ]),
 ("roster","ADMIN TOOL","MyRoster","calendar","Start with a roster file, Crewlink text or an available planning option.","Home  /  Admin  /  MyRoster","MyRoster/index.html",[
  ("screen",s("roster-import","A   •   Roster Import with the Crewlink instructions open",222)),
  ("steps",[
   ("Roster PDF","Choose the original text-based roster PDF. If the browser cannot read it, try another copy or the Crewlink text route."),
   ("Crewlink","On iPhone or iPad, select <b>Crewlink</b>, then <b>Continue</b>. Sign in to Crewlink, use its Share / Copy flow, then return to MyDuty."),
   ("Paste the roster","Paste into <b>Roster text from Crewlink</b>. Check that the source roster and date are current before export."),
  ]),
  ("note","calendar","Use Planning Tools for a planning-only export","Expand <b>Part Time and Future Duties</b>. Choose your contract type and supply a known part-time day if needed. Use <b>+ Add Future Duty</b> for annual leave and wrap days where applicable. Other duty types are listed in the selector, but the current future-duty export generates annual leave only."),
 ]),
 ("roster-export","ADMIN TOOL  /  MYROSTER","Preview and export a roster","calendar","Review what the site detected, download the calendar file, then import it where you want the events.",None,None,[
  ("screen",s("roster-preview","A   •   Roster Preview  /  Example annual leave only",209)),
  ("duo",[
   ("A1–A2  ·  Find and filter","Tap <b>Next</b> under <b>3) Export</b>. Filter the preview by title, route or crew and by event type to review the items."),
   ("A3  ·  Review event rows","Compare dates and LHR-local times with your roster. New, Changed and Unchanged compare with browser import history."),
  ]),
  ("screen",s("roster-export","B   •   Export actions after Next",126)),
  ("duo",[
   ("B1  ·  Sync with iCloud Calendar","Downloads an <b>.ics</b> file. Import it into your intended calendar. On Mac, open Calendar, choose <b>File &gt; Import</b> and select the .ics file. Check for outdated or duplicate events after reimporting."),
   ("B2  ·  Clear Cache","Clears roster data and import history in this browser. Manage previously imported entries in your calendar app. Keep roster files and your calendar private."),
  ]),
  ("link","Apple Support  ·  Import a calendar file on Mac",APPLE_CALENDAR),
 ]),
 ("help","SUPPORT","Help and glossary","help","Use Feedback on the page you are reporting so the person reviewing it knows which tool you were using.",None,None,[
  ("pair",s("home-admin","A   •   Expand the Admin section from Home",133),s("access","B   •   Request Access from the prompt",170)),
  ("duo",[
   ("A  ·  Missing admin tools","Expand <b>Admin</b> on Home. The two tools are MyExams and MyRoster."),
   ("B1  ·  Request Access","Use <b>Request Access</b> on the prompt. The link opens an email draft."),
  ]),
  ("note","help","Report a problem","Include the tool, your device and browser, what you selected and what happened. Leave credentials, crew identifiers and customer information out of feedback and screenshots."),
  ("glossary",[
   ("AOR","Area of Responsibility"),
   ("FDP","Flight Duty Period"),
   ("SCCM / aSCCM","Senior Cabin Crew Member / acting SCCM"),
   ("IFM / IFL","In-flight Manager / In-flight Lead"),
   ("STD / ETA","Scheduled time of departure / estimated time of arrival"),
   ("Zulu / UTC / GMT","Time basis shown with a Z or GMT label"),
   (".ics","A file you can import into a compatible calendar"),
  ]),
 ]),
]
