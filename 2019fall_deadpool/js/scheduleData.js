// Will eventually hold all of the data for the Google and Apple calendar APIs
// The classes will go here so we only need one central point of reference
class dateEvent {
    constructor(description, month, day, date, stime, etime, timezone, location) {
        this.description = description;
        this.month = month;
        this.day = day;
        this.date = date;
        this.stime = stime;
        this.etime = etime;
        this.timezone = timezone;
        this.location = location;
    }
}