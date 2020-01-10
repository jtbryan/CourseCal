var pdfreader = require('electron').remote.require("pdfreader");

// Lets the user pick a PDF file from their file explorer
function fileExplorer() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf'
    input.onchange = e => { 
        var file = e.target.files[0];

        // Make sure the file is a PDF before parsing
        if(file.type === "application/pdf"){
            parseSchedule(file.path);
            remote.getGlobal("received").receivedpdf = true;
            document.getElementById('instructions').innerHTML = "Recieved!";
        } else{
            console.error("Please provide the name of a PDF file.");
        }
    }
    input.click();
}

// Opens up the folder browser
function folderExplorer() {
    var folder = document.getElementById('folderInput');
    return new Promise((resolve, reject) => {
        folder.onchange=function(){
            var files = folder.files;
            resolve(files[0].path);
            //return files[0].path;
        }
        folder.click();
    })
}