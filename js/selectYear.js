// Stores the user's preferred calendar
function selectYear(){
    
    console.log(remote.getGlobal("numevents").eventsnumber)
    console.log(remote.getGlobal("numevents").termnumber)
    //if(remote.getGlobal("numevents").eventsnumber > 0 || remote.getGlobal("numevents").termnumber > 0){
        choice = document.getElementById("YearSelect").value;
        console.log(choice);
        if(choice == "2019/2020"){

            AcadCalParse("assets/AcadCal-19-20.pdf");

            //createICS();
        }
        if(choice == "2020/2021") {
           AcadCalParse("assets/AcadCal2020-2021.pdf");
            //gCal();
        }
        //document.getElementById('yearSelect').value = "";
    //}
    /*else{
        const dialogOptions = {
            type: 'error', 
            buttons: ['OK'], 
            title: 'Export Error.',
            message: 'Please supply a schedule or events before exporting',
        }
        remote.dialog.showMessageBox(dialogOptions)
        document.getElementById('calendarSelect').value = "";
    }*/
}