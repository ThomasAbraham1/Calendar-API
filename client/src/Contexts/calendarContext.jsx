import React, { useState, useContext } from 'react';
const calendarContext = React.createContext();

export const calendarContextFunction = () => {
    return calendarContext;
}