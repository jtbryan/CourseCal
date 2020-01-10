const { writeFileSync } = require('fs')
const ics = require('ics');

const monthEnum = {"January":0, "February":1, "March":2,
                   "April":3, "May":4, "June":5, "July":6,  
                   "August":7, "September":8, "October":9,
                   "November":10, "Dec":11}

const dayEnum = {"Monday":1, "Tuesday":2, "Wednesday":3, "Thursday":4,
                 "Friday":5, "Saturday":6, "Sunday":7}

function createICS() {

  var beginmsg = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Team Deadpool\n"
  var endmsg = "END:VCALENDAR"
  var totalevents = ""
  var monthstring = ""
  var daystring = ""
  var i
  var j
  var count = 0

  var aDate = new Date();
  var pre = 
  aDate.getFullYear().toString() +
    ((aDate.getMonth() + 1)<10? "0" + (aDate.getMonth() + 1).toString():(aDate.getMonth() + 1).toString()) + 
    ((aDate.getDate() + 1)<10? "0" + aDate.getDate().toString():aDate.getDate().toString());
  var post = (aDate.getHours()%24).toString() + aDate.getMinutes().toString() + "00";

  datetimestamp = pre + "T" + post + "Z";

  if(remote.getGlobal("numevents").termnumber > 0){
    let weekstats = remote.getGlobal("week").weekdays;
    console.log(weekstats)

    // loop through each day of the week
    for(i = 0; i < 5; i++){

        if(i == 0){
            var curday = weekstats.Monday
        }
        else if(i == 1){
            var curday = weekstats.Tuesday
        }
        else if(i == 2){
            var curday = weekstats.Wednesday
        }
        else if(i == 3){
            var curday = weekstats.Thursday
        }
        else if(i == 4){
            var curday = weekstats.Friday
        }

        if(daystring != ""){
            var temp = parseInt(daystring, 10)
            temp += 1
            daystring = temp.toString()
        }

        for(j = 0; j < curday.length; j++){
            var starttime = curday[j].stime;
            var endtime = curday[j].etime;
            var shour, smin, ehour, emin;
            if(starttime.search("P") != -1){
                var found = starttime.search(":")
                shour = starttime.slice(0, found)
                shour = parseInt(shour, 10)
                shour = (shour%12)+12;
                smin = starttime.slice(found+1, starttime.search("P"))
                smin = parseInt(smin, 10)
            }
            else if(starttime.search("A") != -1){
                var found = starttime.search(":")
                shour = starttime.slice(0, found)
                shour = parseInt(shour, 10)
                smin = starttime.slice(found+1, starttime.search("A"))
                smin = parseInt(smin, 10)
            }
            if(endtime.search("P") != -1){
                var found = endtime.search(":")
                ehour = endtime.slice(0, found)
                ehour = parseInt(ehour, 10)
                ehour = (ehour%12)+12;
                emin = endtime.slice(found+1, endtime.search("P"))
                emin = parseInt(emin, 10)
            }
            else if(endtime.search("A") != -1){
                var found = endtime.search(":")
                ehour = endtime.slice(0, found)
                ehour = parseInt(ehour, 10)
                emin = endtime.slice(found+1, endtime.search("A"))
                emin = parseInt(emin, 10)
            }
  
            var year = remote.getGlobal('semester').year;

            // Creates the bounds for each event
            if(remote.getGlobal('semester').term === "Fall"){
                var startMonth = remote.getGlobal('semester').Fall.fstart.slice(0, remote.getGlobal('semester').Fall.fstart.search(' '));
                var monthnum1 = monthEnum[startMonth]+1 // + 1 due to formatting issues in the ics file
                var startDay = remote.getGlobal('semester').Fall.fstart.slice(remote.getGlobal('semester').Fall.fstart.search(' ')+1, remote.getGlobal('semester').Fall.fstart.length);
                var endMonth = remote.getGlobal('semester').Fall.fend.slice(0, remote.getGlobal('semester').Fall.fend.search(' '));
                var monthnum2 = monthEnum[endMonth]+1 // + 1 due to formatting issues in the ics file
                var endDay = remote.getGlobal('semester').Fall.fend.slice(remote.getGlobal('semester').Fall.fend.search(' ')+1, remote.getGlobal('semester').Fall.fend.length);
            }
            else if(remote.getGlobal('semester').term === "Spring"){
                var startMonth = remote.getGlobal('semester').Spring.sstart.slice(0, remote.getGlobal('semester').Spring.sstart.search(' '));
                var monthnum1 = monthEnum[startMonth]+1 // + 1 due to formatting issues in the ics file
                var startDay = remote.getGlobal('semester').Spring.sstart.slice(remote.getGlobal('semester').Spring.sstart.search(' ')+1, remote.getGlobal('semester').Spring.sstart.length);
                var endMonth = remote.getGlobal('semester').Spring.send.slice(0, remote.getGlobal('semester').Spring.send.search(' '));
                var monthnum2 = monthEnum[endMonth]+1 // + 1 due to formatting issues in the ics file
                var endDay = remote.getGlobal('semester').Spring.send.slice(remote.getGlobal('semester').Spring.send.search(' ')+1, remote.getGlobal('semester').Spring.send.length);
            }
 
            // it is 8 - the day classes start due to the fact we want a full rotation to Monday
            var beginday = parseInt(startDay) + (8 - dayEnum[remote.getGlobal('semester').Fall.fstartday]);
            var finalday = remote.getGlobal('semester').Fall.endDay;

            monthstring = monthnum1.toString()
            monthstring = monthnum1 < 10 ? "0" + monthstring : monthstring
            if(daystring == ""){
                daystring = beginday.toString()
                daystring = beginday < 10 ? "0" + daystring : daystring
            }

            msgData1 = year + monthstring + daystring + "T" + ('0' + shour).slice(-2) + ('0' + smin).slice(-2) + "00"
            msgData2 = year + monthstring + daystring + "T" + ('0' + ehour).slice(-2) + ('0' + emin).slice(-2) + "00"
            msgData3 = curday[j].location
            msgData4 = curday[j].description
            var a = new Date(year, monthnum1, startDay, 0, 0, 0, 0);
            var b = new Date(year, monthnum2, endDay, 0, 0, 0, 0);
            weeks = weeksBetween(a, b);

            var event = "BEGIN:VEVENT\nUID:" + pre + "_SUMMARY" + count +"@Deadpool\nDTSTAMP:" + datetimestamp + "\nDTSTART:" + msgData1 +"\nDTEND:" + msgData2 + "\nRRULE:FREQ=WEEKLY;COUNT=" + weeks + "\nLOCATION:" + msgData3 + "\nSUMMARY:" + msgData4 + "\nEND:VEVENT\n"
            totalevents = totalevents + event
            count += 1
        }
    }
    weekstats.Monday = []
    weekstats.Tuesday = []
    weekstats.Wednesday = []
    weekstats.Thursday = []
    weekstats.Friday = []
    remote.getGlobal("numevents").termnumber = 0;
  }
  if(remote.getGlobal("numevents").eventsnumber > 0){
   
    table = document.getElementById("eventTable");
    var description = ""
    var local = ""
    var start = ""
    var end = ""
    var date = ""
    var find = 0;
    var breakpoint = 0;
    // access the last row
    while(table.rows.length > 1) {

        row = table.rows[table.rows.length-1]; // get last row
        cell = row.cells[0].innerHTML; // get cell data

        spos = cell.search(":")
        epos = cell.search("<br>");
        for(var i = spos+2; i < epos; i++){
            description+=cell[i];
        }
        cell = cell.slice(epos+4);

        spos = cell.search(":")
        epos = cell.search("<br>");
        for(var i = spos+2; i < epos; i++){
            local+=cell[i];
        }
        cell = cell.slice(epos+4);

        spos = cell.search(":")
        epos = cell.search("<br>");
        for(var i = spos+2; i < epos; i++){
            start+=cell[i];
        }
        cell = cell.slice(epos+4);

        spos = cell.search(":")
        epos = cell.search("<br>");
        for(var i = spos+2; i < epos; i++){
            end+=cell[i];
        }
        cell = cell.slice(epos+4);

        spos = cell.search(":")
        epos = cell.search("<br>");
        for(var i = spos+2; i < epos; i++){
            date+=cell[i];
        }
        cell = cell.slice(epos+4);

        start = start.replace(':', "")
        end = end.replace(':', "")
        date = date.replace('-', "")
        date = date.replace('-', "")
        date += "T"

        var event = "BEGIN:VEVENT\nUID:" + pre + "_SUMMARY" + count +"@Deadpool\nDTSTAMP:" + datetimestamp + "\nDTSTART:" + date + start +"00\nDTEND:" + date + end + "00\nLOCATION:" + local + "\nSUMMARY:" + description + "\nEND:VEVENT\n"  
        totalevents = totalevents + event
        count += 1
        table.deleteRow(-1);
    }
    remote.getGlobal("numevents").eventsnumber = 0
  }
  var icsMSG = beginmsg + totalevents + endmsg;

  // Creates the event
  var uri = "data:text/calendar;charset=utf8," + escape(icsMSG);
  var link = document.createElement("a");
  link.href = uri;
  link.style = "display:none";
  link.download = "icsfile.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  table = document.getElementById("scheduleTable");
  while(table.rows.length > 1) {
    table.deleteRow(-1);
  }
  table.style.display = "none"
  document.getElementById("scheduleMessage").style.display = "block"

  table = document.getElementById("eventTable");
  table.style.display = "none"

  document.getElementById("export").style.display = "none"
  document.getElementById("eventMessage").style.display = "block"
}

// Sets the weeks between each event
function weeksBetween(date1, date2) {
    var WEEK = 1000 * 60 * 60 * 24 * 7;

    var date1ms = date1.getTime();
    var date2ms = date2.getTime();

    var diff = Math.abs(date2ms - date1ms);

    return Math.floor(diff / WEEK)
}

function createICSfromEvents(){
    
}