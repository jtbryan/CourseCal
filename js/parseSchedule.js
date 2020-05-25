const electron = require('electron');

//Parses the string data from a given weekday array, will set those into an
//event date class member later on
function stringParse(weekday, day) {
    var temp = [];
    var counter = 0;
    var i = 0
    //goes through weekday array
    for(var k = 0; k < weekday.length; k++) {
        temp = weekday[k].split(" ", 3); //splits up data of first part of each string
        temp[0] = temp[0].slice(0, temp[0].length-1); //removes -
        //console.log(temp);
        //finds where classname begins (3 spaces into string)    
        for(i = 0; i < weekday[k].length; i++) {
            if(weekday[k][i] === ' ') {
                counter++;
            }
            if(counter === 3) {
                counter = 0;
                break;
            }

        }
        //separates classname into separate string
        var classname = weekday[k].slice(i + 1);
        //console.log(classname);
        event = new dateEvent(classname,"n/a",day,"n/a",temp[0],temp[1], "Central", temp[2]);
        weekday[k] = event;
        //console.log(event);
    }
}
// Function to prevent duplicate code
function parseSchedule(filename) {

    // Array with each index containing info about a different class that day
    var Monday = [], Tuesday = [], Wednesday = [], Thursday = [], Friday = [];

    // x position for each day of the week
    var mXpos = 0.0, tXpos = 0.0, wXpos = 0.0, rXpos = 0.0, fXpos = 0.0;
    var prev = 0.0;

    new pdfreader.PdfReader().parseFileItems(filename, function(err, item) {
        if (err) console.log("Error in parseFileItems().");
        else if (!item) console.log("Done!");
        // else if (item.file) console.log("file =", item.file.path);
        // else if (item.page) console.log("page =", item.page);
        else if (item.x) {
          
          // sets the semester and year the student has provided for the term provided
          if(item.text.includes("Fall") || item.text.includes("Spring") || item.text.includes("Summer")){
              remote.getGlobal('semester').term = item.text.slice(0, item.text.search(" "))
              remote.getGlobal('semester').year = item.text.slice(item.text.search(" ")+1, item.text.length)
          }
          // Set the X position of each date
          mXpos = item.text === "MONDAY" ? item.x : mXpos,
          tXpos = item.text === "TUESDAY" ? item.x : tXpos,
          wXpos = item.text === "WEDNESDAY" ? item.x : wXpos,
          rXpos = item.text === "THURSDAY" ? item.x : rXpos,
          fXpos = item.text === "FRIDAY" ? item.x : fXpos;

            // Find which day of the week the X position correlates with
            if (item.x < mXpos && item.x > mXpos - 2.0) {

                // If the x val is the same as before, we're reading the same class info, so append it to the string
                if (item.x === prev) Monday[Monday.length - 1] = Monday[Monday.length - 1] + item.text;

                // Else it's a new class and we need to add a new element to the array
                else {
                    Monday.push(item.text);
                    prev = item.x
                }
            }

            // Same as above
            else if (item.x < tXpos && item.x > tXpos - 2.0) {
                if (item.x === prev) Tuesday[Tuesday.length - 1] = Tuesday[Tuesday.length - 1] + item.text;
                else { Tuesday.push(item.text); prev = item.x }
            }
            else if (item.x < wXpos && item.x > wXpos - 2.0) {
                if (item.x === prev) Wednesday[Wednesday.length - 1] = Wednesday[Wednesday.length - 1] + item.text;
                else { Wednesday.push(item.text); prev = item.x }
            }
            else if (item.x < rXpos && item.x > rXpos - 2.0) {
                if (item.x === prev) Thursday[Thursday.length - 1] = Thursday[Thursday.length - 1] + item.text;
                else { Thursday.push(item.text); prev = item.x }
            }
            else if (item.x < fXpos && item.x > fXpos - 2.0) {
                if (item.x === prev) Friday[Friday.length - 1] = Friday[Friday.length - 1] + item.text;
                else { Friday.push(item.text); prev = item.x }
            }
        }
    });

    // Console logging for debugging
    // -- Makes sure we're correctly parsing the PDF
    setTimeout(function() {
        console.log("Monday: ", Monday);
        stringParse(Monday, "Monday");
        console.log("Monday2: ", Monday);
        console.log("Tuesday: ", Tuesday);
        stringParse(Tuesday, "Tuesday");
        console.log("Wednesday: ", Wednesday);
        stringParse(Wednesday, "Wednesday");
        console.log("Thursday: ", Thursday);
        stringParse(Thursday, "Thursday");
        console.log("Friday: ", Friday);
        stringParse(Friday, "Friday");

        var Weekdays = {Monday: Monday, Tuesday: Tuesday, Wednesday: Wednesday, Thursday: Thursday, Friday: Friday}
        remote.getGlobal("week").weekdays = Object.assign({}, Weekdays);

        var greatestNum = 0;

        greatestNum = Weekdays.Monday.length > greatestNum ? Weekdays.Monday.length : greatestNum
        greatestNum = Weekdays.Tuesday.length > greatestNum ? Weekdays.Tuesday.length : greatestNum
        greatestNum = Weekdays.Wednesday.length > greatestNum ? Weekdays.Wednesday.length : greatestNum
        greatestNum = Weekdays.Thursday.length > greatestNum ? Weekdays.Thursday.length : greatestNum
        greatestNum = Weekdays.Friday.length > greatestNum ? Weekdays.Friday.length : greatestNum

        console.log(greatestNum)

        console.log(remote.getGlobal("numevents").termnumber)
        remote.getGlobal("numevents").termnumber = greatestNum
        console.log(remote.getGlobal("numevents").termnumber)
        if(greatestNum > 0){
                var table = document.getElementById("scheduleTable");
                while(table.rows.length > 1)
                {
                    table.deleteRow(-1)
                }
               console.log("Before:")
               console.log(table.rows.length)
                table.style.display = "block"
                document.getElementById("scheduleMessage").style.display = "none"
                for(var i = 0; i < greatestNum; i++){
                    var validmon = false 
                    var validtues = false 
                    var validwed = false 
                    var validthur = false 
                    var validfri = false
                    var validsat = false
                    var validsun = false
                    var row = table.insertRow(-1)
                    var sunCell = row.insertCell(0)
                    var monCell = row.insertCell(1)
                    var tuesCell = row.insertCell(2)
                    var wedCell = row.insertCell(3)
                    var thurCell = row.insertCell(4)
                    var friCell = row.insertCell(5)
                    var satCell = row.insertCell(6)
                    if(Weekdays.Monday.length > i){
                        monCell.innerHTML = Weekdays.Monday[i].description + "<br />" + "<br />" + Weekdays.Monday[i].location + "<br />" + "Start: " + Weekdays.Monday[i].stime + "<br />" + "End: " + Weekdays.Monday[i].etime;
                        validmon = true
                    }
                    if(Weekdays.Tuesday.length > i){
                        tuesCell.innerHTML = Weekdays.Tuesday[i].description + "<br />" + "<br />" + Weekdays.Tuesday[i].location + "<br />" + "Start: " + Weekdays.Tuesday[i].stime + "<br />" + "End: " + Weekdays.Tuesday[i].etime
                        validtues = true
                    }
                    if(Weekdays.Wednesday.length > i){
                        wedCell.innerHTML = Weekdays.Wednesday[i].description + "<br />" + "<br />" + Weekdays.Wednesday[i].location + "<br />" + "Start: " + Weekdays.Wednesday[i].stime + "<br />" + "End: " + Weekdays.Wednesday[i].etime
                        validwed = true
                    }
                    if(Weekdays.Thursday.length > i){
                        thurCell.innerHTML = Weekdays.Thursday[i].description + "<br />" + "<br />" + Weekdays.Thursday[i].location + "<br />" + "Start: " + Weekdays.Thursday[i].stime + "<br />" + "End: " + Weekdays.Thursday[i].etime
                        validthur = true
                    }
                    if(Weekdays.Friday.length > i){
                        friCell.innerHTML = Weekdays.Friday[i].description + "<br />" + "<br />" + Weekdays.Friday[i].location + "<br />" + "Start: " + Weekdays.Friday[i].stime + "<br />" + "End: " + Weekdays.Friday[i].etime
                        validfri = true
                    }    
                    if(validmon == false){
                        monCell.innerHTML = "N/A"
                    }
                    if(validtues == false){
                        tuesCell.innerHTML = "N/A"
                    }
                    if(validwed == false){
                        wedCell.innerHTML = "N/A"
                    }
                    if(validthur == false){
                        thurCell.innerHTML = "N/A"
                    }
                    if(validfri == false){
                        friCell.innerHTML = "N/A"
                    }
                    if(validsat == false){
                        satCell.innerHTML = "N/A"
                    }
                    if(validsun == false){
                        sunCell.innerHTML = "N/A"
                    }
                }

                var cells = document.getElementById("scheduleTable").getElementsByTagName("td");
                for (var i = 0; i < cells.length; i++) {
                    if (cells[i].innerHTML == "N/A") {
                        cells[i].style.color = "rgba(218, 30, 30, 0.562)";
                    }
                }
        }
    }, 200);
}