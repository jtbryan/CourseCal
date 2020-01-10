const electron = require('electron');
const{app, BrowserWindow, Menu} = electron;
let window;
const ipc = require('electron').ipcMain;

global.received = {receivedpdf: false};
//global.year = {value: ''};
global.week = {weekdays: {}}
global.semester = {term: '', year: '', 
                Fall: {fstart: '',fstartday: '', fend: '', fendday: ''}, 
                Spring: {sstart: '',sstartday: '', send: '', sendday: ''}, 
                Summer: {sumstart: '',sumstartday: '', sumend: '', sumendday: ''}}
global.numevents = {termnumber: 0, prevtotal: 0, eventsnumber: 0}

// waits for app to be ready
app.on('ready', () => {

    // create a new window
    window = new BrowserWindow({
        width: 1000,
        height: 600,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false,
        fullscreen: false
    });

    // load the html onto the window
    window.loadFile('window.html')
    
    // waits for the window to close
    window.on('close', () => {
        win = null;
    });

    // login verification
    ipc.on('valid-login', function(event, cloud) {
        
        window.webContents.send('cloud-info', cloud)
    })
});