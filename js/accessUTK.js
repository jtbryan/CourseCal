function openUTK(){
    
    // Opens up a new window so the user can login to myUTK and download their PDF
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
    win.loadURL('https://my.utk.edu')
}

//Opens up a new window to the academic calendar page on myUTK where the user can download an ICS file
//for dates of exams/breaks for classes
function openDates() {
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
    win.loadURL('https://registrar.utk.edu/calendar/academic-calendars/')
}