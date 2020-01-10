function contactList(){
    
    // Creates a new window if the user selects the contact option
    const {BrowserWindow} = require('electron').remote;
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
    win.loadFile("./contactInfo/contact.html")
}