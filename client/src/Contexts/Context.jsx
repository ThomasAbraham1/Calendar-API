import React, { useState, useContext } from 'react'
import { textStreamContextFunction } from './textStreamContext';
import { chatContextFunction } from "./chatContext";
import { calendarContextFunction } from "./calendarContext";
import { toasterContextFunction } from "./toasterContext"
import { modalContextFunction } from "./modalContext"
import { MsalAccessTokenContextFunction } from "./MsalAccessTokenContext"
import { Toaster, toast } from 'sonner'

const textStreamContext = textStreamContextFunction();
const chatContext = chatContextFunction();
const calendarContext = calendarContextFunction();
const toasterContext = toasterContextFunction();
const modalContext = modalContextFunction();
const msalAccessTokenContext = MsalAccessTokenContextFunction();



export default function Context({ children }) {
    const [textStream, setTextStream] = useState(1);
    const [messageList, setMessageList] = useState([]);
    const [graphData, setGraphData] = useState(null);
    const [open, setOpen] = useState(false);
    const [accessToken, setAccessToken] = useState(null);


    return (
        <textStreamContext.Provider value={{ textStream, setTextStream }}>
            <chatContext.Provider value={{ messageList, setMessageList }}>
                <calendarContext.Provider value={{ graphData, setGraphData }}>
                    <toasterContext.Provider value={{ Toaster, toast }}>
                        <modalContext.Provider value={{ open, setOpen }}>
                            <msalAccessTokenContext.Provider value={{ accessToken, setAccessToken }} >
                                {children}
                            </msalAccessTokenContext.Provider>
                        </modalContext.Provider>
                    </toasterContext.Provider>
                </calendarContext.Provider>
            </chatContext.Provider>
        </textStreamContext.Provider>

    )
}