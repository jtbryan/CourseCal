const prompt = require('electron-prompt');
const iCloud = require('apple-icloud')
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;

// Create a new iCloud sesion when we select Apple calendar
document.getElementById('pass').onkeypress = function(e){
  cloud = new iCloud()
  if(!e) e = window.event;
  var keyCode = e.keyCode || e.which;
    // if the user has pressed the enter key in the password input field
    if (keyCode == '13'){
      submitLogin();
  }
}

// Apple login verification
function submitLogin() {

    var session = "./finalStuff.json" // Has to be a session object or file path that points on a JSON file containing your session
    var username = document.getElementById("user").value; // Your apple id
    var password = document.getElementById("pass").value; // Your password

    // This creates your iCloud instance
    myCloud = new iCloud(session, username, password);
    myCloud.saveSession("./stuff.json");
    console.log('Cloud here:')
    console.log(myCloud)
    myCloud.on("ready", function() {
        console.log("Ready Event!");
        // Check if the two-factor-authentication is required
        if (myCloud.twoFactorAuthenticationIsRequired) {
          // Get the security code using electron-prompt
          prompt({
            title: '2FA',
            label: 'Two Factor Authentication code:',
            inputAttrs: {
                type: 'text',
                required: true
            },
            type: 'input'
          })
          .then((TFA) => {
            if(TFA === null) {
                console.log('No security code entered');
            } else {
                console.log('Security code: ', TFA);
            }
            myCloud.securityCode = TFA;
          })
          .catch(console.error); 
        }
        else {
          // Now the 'ready' event fired but 'twoFactorAuthenticationIsRequired' is false, which means we don't need it (anymore)
          console.log("You are logged in completely!");
          const dialogOptions = {
            type: 'info', 
            buttons: ['OK'], 
            title: 'Successful login.',
            message: 'You have been successfully logged in.',
          }
          ipc.send('valid-login', myCloud);
          remote.dialog.showMessageBox(dialogOptions)
          var window = remote.getCurrentWindow();
          window.close();
        }
    });
    myCloud.on("err", function(err) {
        if (err.errorCode == 6) {
            //console.error("Given session does not exist or is expired. Try to use contained credentials from session to re-login...");
        }
        // Either the session is not working or the credentials are incorrect
        if (err.errorCode == 7) {
            console.error("The contained credentials are not correct or the given session does not exist/is broken.");
            const dialogOptions = {
              type: 'error', 
              buttons: ['OK'], 
              title: 'Unsuccessful login',
              message: 'Invalid credentials, Please try again.'
            }
            remote.dialog.showMessageBox(dialogOptions)
            document.getElementById("pass").value = "";
            myCloud.on("sessionUpdate", function() {
              myCloud.saveSession();
            });
        }
    });
}