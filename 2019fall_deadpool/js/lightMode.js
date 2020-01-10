// Globals
var eventBody = document.getElementById('eventBody');
var dragArea = document.getElementById('view');
var dropArea = document.getElementById('dnd');
var tab1 = document.getElementById('dnd2');
var tab2 = document.getElementById('dnd3');
var sideBar = document.getElementById('mySidenav');
var selector = document.getElementById('calendarSelect');
var selector2 = document.getElementById('SemesterSelect');
var selector3 = document.getElementById('themeSelect');
var link1 = document.getElementById('New');
var link2 = document.getElementById('Create');
var link3 = document.getElementById('MyUTK');
var link4 = document.getElementById('light');
var link5 = document.getElementById('Contact');
var link6 = document.getElementById('Help');
var link7 = document.getElementById('Dates');

// Light Mode
function lightenUp() {
    dragArea.style.backgroundColor = "#f0f0f0";
    dropArea.style.backgroundColor = "#f0f0f0";
    tab1.style.backgroundColor = "#f0f0f0";
    tab2.style.backgroundColor = "#f0f0f0";
    sideBar.style.backgroundColor = "white";

    selector.style.backgroundColor = "white";
    selector.style.color = "#353535";
    selector2.style.backgroundColor = "white";
    selector2.style.color = "#353535";
    selector3.style.backgroundColor = "white";
    selector3.style.color = "#353535";
    link1.style.color = "#353535";
    link2.style.color = "#353535";
    link3.style.color = "#353535";
    link4.style.color = "#353535";
    link5.style.color = "#353535";
    link6.style.color = "#353535";
    link7.style.color = "#353535";

    eventBody.style.backgroundColor = "white";
}

// Dark mode
function darkenDown() {
    dragArea.style.backgroundColor = "#202020";
    dropArea.style.backgroundColor = "#202020";
    tab1.style.backgroundColor = "#202020";
    tab2.style.backgroundColor = "#202020";
    sideBar.style.backgroundColor = "#353535";

    selector.style.backgroundColor = "#353535";
    selector.style.color = "#fff";
    selector2.style.backgroundColor = "#353535";
    selector2.style.color = "#fff";
    selector3.style.backgroundColor = "#353535";
    selector3.style.color = "#fff";
    link1.style.color = "#fff";
    link2.style.color = "#fff";
    link3.style.color = "#fff";
    link4.style.color = "#fff";
    link5.style.color = "#fff";
    link6.style.color = "#fff";
    link7.style.color = "#fff";

    eventBody.style.backgroundColor = "#202020";
}

// Vol mode
function volMode() {
    dragArea.style.backgroundColor = "#ff8200";
    dropArea.style.backgroundColor = "#ff8200";
    tab1.style.backgroundColor = "#ff8200";
    tab2.style.backgroundColor = "#ff8200";
    sideBar.style.backgroundColor = "#ff8200";

    selector.style.backgroundColor = "#fff";
    selector.style.color = "#58595b";
    selector2.style.backgroundColor = "#fff";
    selector2.style.color = "#58595b";
    selector3.style.backgroundColor = "#fff";
    selector3.style.color = "#58595b";
    link1.style.color = "#fff";
    link2.style.color = "#fff";
    link3.style.color = "#fff";
    link4.style.color = "#fff";
    link5.style.color = "#fff";
    link6.style.color = "#fff";
    link7.style.color = "#fff";

    eventBody.style.backgroundColor = "#58595b";
}

// America mode
function baldEagle() {
    dragArea.style.backgroundColor = "#ed1c23";
    dropArea.style.backgroundColor = "#ed1c23";
    tab1.style.backgroundColor = "#ed1c23";
    tab2.style.backgroundColor = "#ed1c23";
    sideBar.style.backgroundColor = "#0660a9";

    selector.style.backgroundColor = "#fff";
    selector.style.color = "#58595b";
    selector2.style.backgroundColor = "#fff";
    selector2.style.color = "#58595b";
    selector3.style.backgroundColor = "#fff";
    selector3.style.color = "#58595b";
    link1.style.color = "#fff";
    link2.style.color = "#fff";
    link3.style.color = "#fff";
    link4.style.color = "#fff";
    link5.style.color = "#fff";
    link6.style.color = "#fff";
    link7.style.color = "#fff";

    eventBody.style.backgroundColor = "#fff";
}

// Theme selector
function themeSelect() {
    var choice = document.getElementById("themeSelect").value;
    if (choice == "light") lightenUp();
    if (choice == "dark") darkenDown();
    if (choice == "vol") volMode();
    if (choice == "america") baldEagle();
    document.getElementById("themeSelect").value = "";
}