import { missedMeetingTemplate, confirmationTemplate, reminderTemplate } from "./emailTemplateRules";
import { GeminiFunction } from "./GeminiFunction";
import { textStreamContextFunction } from "../../Contexts/textStreamContext";
import { chatContextFunction } from "../../Contexts/chatContext";
import { userProfileContextFunction } from "../../Contexts/userProfileContext"

import React from "react";

export const ParseTextToChat = (selectedEmailTemplate, htmlInvitation) => {
    const { setTextStream } = React.useContext(textStreamContextFunction());
    const { setMessageList } = React.useContext(chatContextFunction());
    const {userName, setUserName} = React.useContext(userProfileContextFunction());

    var queryForEmail = "";
    console.log(selectedEmailTemplate);
    if (selectedEmailTemplate == "MISSED MEETING") queryForEmail = missedMeetingTemplate + htmlInvitation;
    if (selectedEmailTemplate == "REMINDER") queryForEmail = reminderTemplate + htmlInvitation;
    if (selectedEmailTemplate == "CONFIRMATION") queryForEmail = confirmationTemplate + htmlInvitation;
    
    queryForEmail += ". CONTEXT:  FROM HERE, THE REST OF THE TEXT IS ONLY INSTRUcTION THAT YOU KEEP IN YOUR MIND, NOT TALK ABOUT IT TO ME. LIke if I said Hi, don't say that you'll abide by the following instructions, just keep it in mind and be normal. The response should always be in HTML tags but ```html and the ending ``` is not needed and in-case if I asked for email generation and you're giving me an email, use " + userName + " instead of Thomas Abraham as the name in email signature along with other info about the company like company name and phone number" ;
    console.log(queryForEmail);
    var message = {
        author: "me",
        data: { text: queryForEmail },
        type: "text"
    } 

    setMessageList(prevMessageList => [...prevMessageList, message]);
    const result = async () => {
        const promptResult = await GeminiFunction(queryForEmail, setTextStream);
        return promptResult;
    }
    console.log(result);
}
