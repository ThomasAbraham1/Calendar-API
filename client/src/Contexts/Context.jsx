import React, { useState, useContext } from 'react'
import { textStreamContextFunction } from './textStreamContext';
import { chatContextFunction } from "./chatContext";
import { calendarContextFunction } from "./calendarContext";

const textStreamContext = textStreamContextFunction();
const chatContext = chatContextFunction();
const calendarContext = calendarContextFunction();



export default function Context({ children }) {
    const [textStream, setTextStream] = useState(1);
    const [messageList, setMessageList] = useState([]);
    const [graphData, setGraphData] = useState(null);


    return (
        <textStreamContext.Provider value={{ textStream, setTextStream }}>
            <chatContext.Provider value={{ messageList, setMessageList }}>
                <calendarContext.Provider value={{ graphData, setGraphData }}>
                    {children}
                </calendarContext.Provider>
            </chatContext.Provider>
        </textStreamContext.Provider>

    )
}