const tc = require("timezonecomplete");

function timezoneConvertor(timezoneName, eventDate) {
    var timezoneAbbreviation = '';
    if (timezoneName === "US Mountain Standard Time" || timezoneName === "Mountain Standard Time") {
        timezoneName = "America/Denver";
        timezoneAbbreviation = "MST"
    } else if (timezoneName === "Eastern Standard Time") {
        timezoneName = "America/New_York";
        timezoneAbbreviation = "EST"
    } else if (timezoneName === "Pacific Standard Time") {
        timezoneName = "America/Los_Angeles";
        timezoneAbbreviation = "PST"
    } else if (timezoneName === "India Standard Time") {
        timezoneName = "Asia/Calcutta";
        timezoneAbbreviation = "IST"
    } else {
        timezoneName = "America/Chicago";
        timezoneAbbreviation = "CST"
    }

    const tcUTCDateObject = new tc.DateTime(eventDate, tc.utc());
    const tcTimezoneObject = new tc.TimeZone(timezoneName);
    const convertedDate = tcUTCDateObject.toZone(tcTimezoneObject);
    const formattedTime = convertedDate.format("hh:mm a");

    console.log("Converted Time:", formattedTime, timezoneAbbreviation);
    console.log("Converted Date:", tcUTCDateObject.format("MM/dd/yyyy"));

    var time = formattedTime + " " + timezoneAbbreviation;
    var date = tcUTCDateObject.format("MM/dd/yyyy");

    return ({ date, time });
}

module.exports = timezoneConvertor