import React, { useState, useContext } from 'react'
import { textStreamContextFunction } from './textStreamContext';
import { chatContextFunction } from "./chatContext";
import { calendarContextFunction } from "./calendarContext";
import { toasterContextFunction } from "./toasterContext"
import { Toaster, toast } from 'sonner'

const textStreamContext = textStreamContextFunction();
const chatContext = chatContextFunction();
const calendarContext = calendarContextFunction();
const toasterContext = toasterContextFunction();



export default function Context({ children }) {
    const [textStream, setTextStream] = useState(1);
    const [messageList, setMessageList] = useState([]);
    const [graphData, setGraphData] = useState(null);


    return (
        <textStreamContext.Provider value={{ textStream, setTextStream }}>
            <chatContext.Provider value={{ messageList, setMessageList }}>
                <calendarContext.Provider value={{ graphData, setGraphData }}>
                    <toasterContext.Provider value = {{Toaster, toast}}>
                    {children}
                    </toasterContext.Provider>
                </calendarContext.Provider>
            </chatContext.Provider>
        </textStreamContext.Provider>

    )
}