const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
function gCal() {
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Calendar API.
  authorize(JSON.parse(content), listEvents);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_id, client_secret, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    response_type: 'code',
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  require("electron").shell.openExternal(authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
//}
  var code;
  //function submitCode() {
    //code = document.getElementById("code").value;
  //}
  //rl.question('Enter the code from that page here: ', (code) => {
   //rl.close();
   const prompt = require('electron-prompt');
   prompt({
     title: 'Insert Code Here',
     label: 'Code: ',
     value: 'Ex: 4/alksnepoairnhpoeihapoeih',
     inputAttrs: {
       type: 'url'
     },
     type: 'input'
   })
   .then((r) => {
     if(r === null) {
       console.log('failure');
     } else {
       console.log('result', r);
       code = r;
     //}
   // })
  
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  }
})
  //}
  
  //});
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  console.log('Auth:',auth);
  //var temp = "https://www.googleapis.com/calendar/v3/calendars/primary/events?key=ya29.Il-vBzFJroX8g7LbsE7hY_Oyg4Atpsey0NznI0JAiMgBjPz0GmxAGl7W8y2EzpRgD0oFc_T2BUNijuKoIu7YFSY65wqKEjD9bF8hk45sziY3aXfSOHrzpdvScXBlEJqUxg"
  //auth.setCredentials("ya29.Il-vBzFJroX8g7LbsE7hY_Oyg4Atpsey0NznI0JAiMgBjPz0GmxAGl7W8y2EzpRgD0oFc_T2BUNijuKoIu7YFSY65wqKEjD9bF8hk45sziY3aXfSOHrzpdvScXBlEJqUxg");
  const calendar = google.calendar({version: 'v3', auth});
  /*calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });*/

  var event = {
    'summary': 'Computer Science:401 Class',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-26T06:05:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-26T06:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  if(auth == null) {
    console.log('null');
  }
  calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });

  var event2 = {
    'summary': 'Computer Science:360 Lab',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-26T12:35:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-26T13:25:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  calendar.events.insert({
    //auth: auth,
    calendarId: 'primary',
    resource: event2,
  }, function(err, event2) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event2.htmlLink);
  });

  var event3 = {
    'summary': 'Computer Science:494 Class',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-27T06:40:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-27T07:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  calendar.events.insert({
    //auth: auth,
    calendarId: 'primary',
    resource: event3,
  }, function(err, event3) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event3.htmlLink);
  });

  var event4 = {
    'summary': 'Computer Science:360 Lecture',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-27T09:40:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-27T10:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  calendar.events.insert({
    //auth: auth,
    calendarId: 'primary',
    resource: event4,
  }, function(err, event4) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event4.htmlLink);
  });

  var event5 = {
    'summary': 'Computer Science:340 Class',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-27T12:40:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-27T13:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  calendar.events.insert({
    //auth: auth,
    calendarId: 'primary',
    resource: event5,
  }, function(err, event5) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event5.htmlLink);
  });

  var event6 = {
    'summary': 'Computer Science:401 Class',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-21T06:05:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-21T06:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  /*calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event6,
  }, function(err, event6) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event6.htmlLink);
  });*/

  var event7 = {
    'summary': 'Computer Science:494 Class',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-22T06:40:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-22T07:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  /*calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event7,
  }, function(err, event7) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event7.htmlLink);
  });*/

  var event8 = {
    'summary': 'Computer Science:360 Lecture',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-22T09:40:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-22T10:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  /*calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event8,
  }, function(err, event8) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event8.htmlLink);
  });*/

  var event9 = {
    'summary': 'Computer Science:340 Class',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-22T12:40:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-22T13:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };

  /*calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event9,
  }, function(err, event9) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event9.htmlLink);
  });*/

  var event10 = {
    'summary': 'Computer Science:401 Class',
    'location': 'Min Kao',
    'description': '',
    'start': {
      'dateTime': '2019-08-23T06:05:00-07:00',
      'timeZone': 'America/New_York',
    },
    'end': {
      'dateTime': '2019-08-23T06:55:00-07:00',
      'timeZone': 'America/New_York',
    },
    'recurrence': [
      'RRULE:FREQ=WEEKLY;UNTIL=20191204T065959Z'
    ],
    /*'attendees': [
      {'email': 'ahknight101@gmail.com'},
    ],*/
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
  };
  
  /*calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event10,
  }, function(err, event10) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event10.htmlLink);
  });*/
}
}
//gCal();
