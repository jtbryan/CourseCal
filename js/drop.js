const { exec } = require('child_process');
var pdfreader = require('electron').remote.require("pdfreader");

// Adds drag and drop functionality to an element and 
// parses the data into structures.
(function () {
    
    // Holder is the drag and drop area in the page
    var holder = document.getElementById('dnd');
    var messages = ["Give it to me", "Om nom nom nom", "Do it, I dare you", "Just do it already", "I haven't got all day", "Feed me", "With great power, comes great responsibility", "Google already knows everything about you, what's this gonna hurt?", "Please help, I'm being forced against my will to convert PDFs to calendar events without health benefits", "They don't pay me enough for this"];
    var randomIndex = 0, lastIndex = randomIndex;

    // When a file is over the drag and drop area
    holder.ondragover = () => {
        document.getElementById('instructions').innerHTML = messages[randomIndex];
        lastIndex = randomIndex;
        return false;
    };

    // When a file leaves the drag and drop area
    holder.ondragleave = () => {
        while (lastIndex === randomIndex) {
            randomIndex = Math.floor(Math.random()*messages.length);
        }
        document.getElementById('instructions').innerHTML = "Drag and drop a PDF of your course schedule from MyUTK";
        return false;
    };
    holder.ondragend = () => {
        return false;
    };

    // When a file is dropped in the drag and drop area
    holder.ondrop = (e) => {
        e.preventDefault();
        for (let f of e.dataTransfer.files) {
            document.getElementById('instructions').innerHTML = "Recieved!";
            parseSchedule(f.path)
            remote.getGlobal("received").receivedpdf = true;
        }
        return false;
    };
})();