const {BrowserWindow} = require('electron').remote;

// Opens a new window if the user selects the help button
function helpSelect(){
    
    var win = new BrowserWindow({ 
        width: 400, 
        height: 550,
        resizable: false,
        fullscreen: false,
        maximizable: false, 
        webPreferences: {
            nodeIntegration: true
        },
    });
    win.setMenuBarVisibility(false)
    win.loadFile("./helpWindow/help.html")
}