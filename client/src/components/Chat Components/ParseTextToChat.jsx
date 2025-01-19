import { missedMeetingTemplate, confirmationTemplate, reminderTemplate } from "./emailTemplateRules";
import { GeminiFunction } from "./GeminiFunction";
import { textStreamContextFunction } from "../../Contexts/textStreamContext";
import { chatContextFunction } from "../../Contexts/chatContext";
import React from "react";

export const ParseTextToChat = (selectedEmailTemplate, htmlInvitation) => {
    const { setTextStream } = React.useContext(textStreamContextFunction());
    const { setMessageList } = React.useContext(chatContextFunction());
    var queryForEmail = "";
    console.log(selectedEmailTemplate);
    if (selectedEmailTemplate == "MISSED MEETING") queryForEmail = missedMeetingTemplate + htmlInvitation;
    if (selectedEmailTemplate == "REMINDER") queryForEmail = reminderTemplate + htmlInvitation;
    if (selectedEmailTemplate == "CONFIRMATION") queryForEmail = confirmationTemplate + htmlInvitation;
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
