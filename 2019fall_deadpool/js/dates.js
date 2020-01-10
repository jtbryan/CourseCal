// Grabs all of the info from the PDF for the academic calendar. Will parse later

function AcadCalParse() {

    
    //Stores all of the info
    var Dates = [];
    var Fall = [], Spring = [], Summer = [];
    var prev = 0.0, start = 0.0;
    var fYpos = 0.0, spYpos = 0.0, suYpos = 0.0, counter = 0, counter2 = 0;
    var fStart = "", fEnd = "", sStart = "", sEnd = "";
    var event;

    // Reads through file
    //console.log(year);



    new pdfreader.PdfReader().parseFileItems("assets/AcadCal-19-20.pdf", function(err, item) {
        if ((item !== undefined) && (item.x !== undefined)) {
            //console.log([item.x, item.y, item.oc, item.A, Math.floor(item.w), item.text].join("\t"));
            //sorts it all so each line is a separate Dates[] entry
            if (item.y === prev ) {
                Dates[Dates.length - 1] = Dates[Dates.length - 1] + item.text;
            } else {
                counter = counter + 1;
                //Keeps track of where in the Dates array fall and spring
                //semesters classes start, then outputs that number
                if(item.text === "Classes Begin") {
                    if(counter2 == 0) {
                        counter2++;
                        fYpos = counter - 1;
                    //    console.log(fYpos);

                    } else {
                        spYpos = counter - 1;
                        //console.log(spYpos);
                    }
                }

                Dates.push(item.text);
                prev = item.y;
            }
        }
    });

        //console.log(Dates); //output here
    //waits for pdf to be read and parsed before executing
    setTimeout(function() {
        //separates into fall array
        for(var i = fYpos; i < (spYpos-1); i++) {
            Fall.push(Dates[i]);

        }
        //into spring array
        for(var i = spYpos; i < 31; i++) {
            Spring.push(Dates[i]);
        }
        //outputs contents of arrays
        console.log(Fall);
        console.log(Spring);

        //checks length
        function checkLength(value) {
            return value.length > 1;
        }

        //begins to filter fall
        var fallStart = Fall[0].split('.');
        var fallStart = fallStart.filter(checkLength);
        if(fallStart.length > 3){
            fallStart[2] + fallStart[3];
            fallStart.pop();
        }

        var fallEnd = Fall[7].split('.');
        var fallEnd = fallEnd.filter(checkLength);
        if(fallEnd.length > 3){
            fallEnd[2] = fallEnd[2] + fallEnd[3];
            fallEnd.pop();
        }

        console.log(fallStart)
        console.log(fallEnd)
        function catDate(array) {
            for(var i = 3; i < array.length; i++) {
                array[2] = array[2] + array[i];
            }
        }
        
        //further parses fall data
        var test = [], title = [], day = [], date = [];
        for(var i = 1; i < Fall.length; i++) {
            test = Fall[i].split('.');
            test = test.filter(checkLength);
            day.push(test[1]);
            if(test.length === 3) {
                date.push(test[2]);
            } else {
                catDate(test);
                date.push(test[2]);
            }
            title.push(test[0]);
        }

        console.log(title);
        console.log(day);
        console.log(date);
        //begins on spring
        day = [], date = [], title = [];
        for(var i = 1; i < Spring.length; i++) {
            test = Spring[i].split('.');
            test = test.filter(checkLength);
            day.push(test[1]);
            if(test.length === 3) {
                date.push(test[2]);
            } else {
                catDate(test);
                date.push(test[2]);
            }
            title.push(test[0]);
        }
        console.log(title);
        console.log(day);
        console.log(date);

        //populates global data
        remote.getGlobal('semester').Fall.fstart = fallStart[2]
        remote.getGlobal('semester').Fall.fend = fallEnd[2]
        remote.getGlobal('semester').Fall.fstartday = fallStart[1]
        remote.getGlobal('semester').Fall.fendday = fallEnd[1]

        event = new dateEvent(fallStart[0], "August", 0, fallStart[2], 0, 0, 0);
        console.log(event);
    }, 400);
    return event;
}
var test2;

test2 = AcadCalParse();
