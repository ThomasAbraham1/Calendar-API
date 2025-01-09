import React from "react";
import moment from "moment" // Import Moment.js
import "moment-timezone"
/*
 * Renders information about the user obtained from MS Graph 
*/
//  @param props
export const ProfileData = (props) => {
  console.log(props)


  return (
    <div id="profile-div">
{/* 
      <strong>First Name: </strong> {props.graphData.givenName}
      <br />

      <strong>Last Name: </strong> {props.graphData.surname}
      <br />

      <strong>Email: </strong> {props.graphData.userPrincipalName}
      <br />

      <strong>Id: </strong> {props.graphData.id}
      <br /> */}
    </div>
  );
};