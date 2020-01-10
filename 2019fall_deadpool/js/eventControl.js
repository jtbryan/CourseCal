const total = remote.getGlobal('numevents');

function returnToMain(){
    document.getElementById('generalNav').style.display = "block";
    document.getElementById('eventCreation').style.display = "none";    
}

function submit(){

    class EventDetails {

        constructor(desc, local, start, end, date, day){
            this.desc = desc;
            this.start = start;
            this.end = end;
            this.date = date;
            this.day = day;
            this.local = local;
        }
    }

    var desc, stime, etime, date, day;
    var weekday = new Array(7);
    weekday[0] = "Monday";
    weekday[1] = "Tuesday";
    weekday[2] = "Wednesday";
    weekday[3] = "Thursday";
    weekday[4] = "Friday";
    weekday[5] = "Saturday";
    weekday[6] = "Sunday";

    desc = document.getElementById('desc').value;
    if(desc === ""){
        desc = "N/A"
    }
    local = document.getElementById('local').value;
    if(local === ""){
        local = "N/A"
    }
    stime = document.getElementById('stime').value;
    etime = document.getElementById('etime').value;
    date = document.getElementById('eventdate').value;
    var dates = new Date(date)
    day = weekday[dates.getDay()]
    eventlist = new EventDetails(desc, local, stime, etime, date, day)

    total.eventsnumber += 1;

    const dialogOptions = {
        type: 'info', 
        buttons: ['OK'], 
        title: 'Event Created.',
        message: 'Event successfully created.',
    }
    remote.dialog.showMessageBox(dialogOptions)

    document.getElementById('desc').value = ''
    document.getElementById('local').value = ''
    document.getElementById('stime').value = '12:00'
    document.getElementById('etime').value = '13:00'
    document.getElementById('eventdate').value = '2019-01-01'
    
    var table = document.getElementById("eventTable");
    table.style.display = "block"
    document.getElementById("eventMessage").style.display = "none"
    document.getElementById("export").style.display = "block"
    var row = table.insertRow(-1)
    var eventCell = row.insertCell(0)
    var deleteCell = row.insertCell(1)
    eventCell.innerHTML = "Description: " + eventlist.desc + "<br/>" + "Location: " + eventlist.local + "<br/>" + "Start time: " + eventlist.start + "<br/>" + "End time: " + eventlist.end + "<br/>" + "Date: " + eventlist.date + "<br/>" + "Day: " + eventlist.day + "<br/>";    
    deleteCell.innerHTML = '<button id="deleteButton" style="font-size:24px" onClick="eventRemove(this)"><i class="fa fa-trash-o"></i></button>'
}

function eventRemove(el){

    const dialogOptions = {
        type: 'question', 
        buttons: ['Yes', 'No'], 
        title: 'Delete',
        message: 'Are you sure you wish to delete this event?',
    }
    remote.dialog.showMessageBox(dialogOptions, (response) => {

        // the user chose yes
        if(response == 0){
            $(el).parents("tr").remove() 
            total.eventsnumber-=1;

            if(total.eventsnumber == 0){
                var table = document.getElementById("eventTable");
                table.style.display = "none"
                document.getElementById("eventMessage").style.display = "block"
            }
        }
    })
}

function pdfExport(){

    const jsPDF = require('jspdf');

    var pdf = new jsPDF('p', 'pt', 'letter');
    // source can be HTML-formatted string, or a reference
    // to an actual DOM element from which the text will be scraped.
    source = $('#scroll1')[0];

    // we support special element handlers. Register them with jQuery-style 
    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // There is no support for any other type of selectors 
    // (class, of compound) at this time.
    specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    };
    margins = {
        top: 80,
        bottom: 60,
        left: 100,
        width: 700
    };
    // all coords and widths are in jsPDF instance's declared units
    // 'inches' in this case
    pdf.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left, // x coord
    margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers
    },

    function (dispose) {
        // dispose: object with X, Y of the last line add to the PDF 
        //          this allow the insertion of new lines after html
        pdf.save('Test.pdf');
    }, margins);
}