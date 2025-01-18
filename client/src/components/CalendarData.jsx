import React from "react";
import CalendarTableLayout from "./CalendarTableLayout";
import { tableBodyClasses } from "@mui/material";
/**
 * Renders information about the user obtained from MS Graph 
*/
//  @param props
export default function CalendarData(props) {

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour format
    timeZone: 'Asia/Kolkata', // IST timezone
  };

  const dateFormatter = (isoDate) => {
    const utcDate = new Date(isoDate + "Z");
    const formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date(utcDate));
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = weekday[utcDate.getUTCDay()];
    const date = utcDate.getUTCDate();
    const month = utcDate.getUTCMonth() + 1;
    const year = utcDate.getUTCFullYear();
    const fullDate =  `${month}/${date}/${year}`
    return {formattedTime, day, fullDate};
  }

  var calendarRows = props.rows;


  var calendarRows = calendarRows.map((item, index) => {
    const isoDate = item.start.dateTime;
    // Convert UTC to IST and format in 12-hour format
    const {formattedTime, day, fullDate} = dateFormatter(isoDate)
    return { id: item['@odata.etag'], subject: item.subject, time: formattedTime, date: fullDate, day: day}
  });
  // Sorting the array based on date
  calendarRows.sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <CalendarTableLayout rows={calendarRows} />
  );
};