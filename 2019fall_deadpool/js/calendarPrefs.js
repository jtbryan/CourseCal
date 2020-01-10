const remote = require('electron').remote;

// Stores the user's preferred calendar
function calendarSelect(){
    
    console.log(remote.getGlobal("numevents").eventsnumber)
    console.log(remote.getGlobal("numevents").termnumber)
    if(remote.getGlobal("numevents").eventsnumber > 0 || remote.getGlobal("numevents").termnumber > 0){
        choice = document.getElementById("calendarSelect").value;
        if(choice == "ics"){

            createICS();
        }
        if(choice == "Google") {

            gCal();
        }
        document.getElementById('calendarSelect').value = "";
    }
    else{
        const dialogOptions = {
            type: 'error', 
            buttons: ['OK'], 
            title: 'Export Error.',
            message: 'Please supply a schedule or events before exporting',
        }
        remote.dialog.showMessageBox(dialogOptions)
        document.getElementById('calendarSelect').value = "";
    }
}