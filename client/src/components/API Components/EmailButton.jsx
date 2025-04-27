import * as React from 'react';
import { useContext } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from "../Pure UI Components/IconButton";
import { calendarContextFunction } from '../../Contexts/calendarContext';
import { missedMeetingTemplate, confirmationTemplate, reminderTemplate } from "../Chat Components/emailTemplateRules";
import { GeminiFunction } from "../Chat Components/GeminiFunction";
import { textStreamContextFunction } from "../../Contexts/textStreamContext";
import { chatContextFunction } from "../../Contexts/chatContext";
import axios from 'axios';
import { toasterContextFunction } from '../../Contexts/toasterContext';
import { MsalAccessTokenContextFunction } from "../../Contexts/MsalAccessTokenContext";
import { userProfileContextFunction } from "../../Contexts/userProfileContext"

const API_URL = import.meta.env.VITE_URL;


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 420,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "8px"
};

export default function BasicModal({ calendarEventId, Icon, joinUrl }) {
    const { accessToken, setAccessToken } = React.useContext(MsalAccessTokenContextFunction());
    const { Toaster, toast } = useContext(toasterContextFunction());
    const { graphData, setGraphData } = React.useContext(calendarContextFunction());
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { setTextStream } = React.useContext(textStreamContextFunction());
    const { setMessageList } = React.useContext(chatContextFunction());
    const [recordingLink, setRecordingLink] = React.useState(null);
    const { userName, setUserName } = React.useContext(userProfileContextFunction());
    const userNameRef = React.useRef('');



    React.useEffect(() => {
        userNameRef.current = userName;
        console.log(userNameRef.current);
    }, [userName])

    // Finds the event records using the event ID that's passed to this component (calenderEventId)
    const emailTypeFunction = (e) => {
        var selectedEmailTemplate = "";
        var calendarEvents = graphData.value;
        if (e.target.innerText == "CONFIRMATION") {
            selectedEmailTemplate = e.target.innerText;
        }
        if (e.target.innerText == "REMINDER") {
            selectedEmailTemplate = e.target.innerText;
        }
        if (e.target.innerText == "MISSED MEETING") {
            selectedEmailTemplate = e.target.innerText;
        }
        console.log(calendarEvents);
        const selectedEventHTML = calendarEvents.find(i => i['@odata.etag'] == calendarEventId);
        // console.log(selectedEventHTML.body.content);
        ParseTextToChat(selectedEmailTemplate, selectedEventHTML.body.content, selectedEventHTML.organizer.emailAddress.name, selectedEventHTML.start.dateTime, selectedEventHTML.originalStartTimeZone, selectedEventHTML.onlineMeeting.joinUrl);
        handleClose();
    }
    // Based on selected email template, prepares the prompt for AI
    const ParseTextToChat = (selectedEmailTemplate, htmlInvitation, eventType, eventDate, originalStartTimeZone, joinUrl) => {

        console.log("Inside parsetext function");
        // timezoneConvertor(originalStartTimeZone, eventDate);
        axios.post(`${API_URL}/timeConvertor`, { originalStartTimeZone: originalStartTimeZone, eventDate: eventDate }).then(async (response) => {
            var { date, time } = response.data;
            var queryForEmail = "";
            console.log(selectedEmailTemplate);
            var eventInfo = "The type of this meeting is a " + eventType + "and date at which it happens is here, " + date + ", time is: " + time + ", and the meeting join link is: " + joinUrl;
            if (selectedEmailTemplate == "MISSED MEETING") queryForEmail = missedMeetingTemplate + htmlInvitation + "\n " + eventInfo;
            if (selectedEmailTemplate == "REMINDER") queryForEmail = reminderTemplate + htmlInvitation + "\n " + eventInfo;
            if (selectedEmailTemplate == "CONFIRMATION") queryForEmail = confirmationTemplate + htmlInvitation + "\n " + eventInfo;
            queryForEmail += ".THIS IS THE IMPORTANT PART!! KEEP IN MIND.. In-case if I asked for email generation and you're giving me an email, use " + userNameRef.current + " instead of Thomas Abraham as the name in email signature along with other info about the company like company name and phone number 713-981-5300 x 400 \n The response should always be in HTML but ```html and the ending ``` is not needed and";
            console.log(queryForEmail);
            var message = {
                author: "me",
                data: { text: queryForEmail },
                type: "text"
            }
            // Pushing the user message to the chat
            setMessageList(prevMessageList => [...prevMessageList, message]);
            // Query the user message to Gemini API for response
            result(queryForEmail);
        })
    }

    // Checks if there exists recordings for an event and gives download link
    const findRecording = async () => {
        axios.get("https://graph.microsoft.com/v1.0/me/chats/", {
            headers: { 'Authorization': 'Bearer ' + accessToken },
        }).then((response) => {
            console.log(response)
            axios.get("")
        }).catch(err => {
            console.log(err)
        })
    }

    const result = async (queryForEmail) => {
        // const promptResult = await GeminiFunction(queryForEmail, setTextStream);
        var chatInputType = 'emailFromcalendar'
        const promptResult = new Promise((resolve, reject) => {
            GeminiFunction(queryForEmail, setTextStream, resolve, reject, chatInputType);
        })
        toast.promise(promptResult, {
            loading: 'Loading...',
            success: (data) => {
                return `${data.name}`;
            },
            error: (data) => "Error " + data.status + " - " + data.response.data.error,
        });
        // return promptResult;
    }

    return (
        <div>
            <IconButton setOpen={setOpen} Icon={Icon} calendarEventId={calendarEventId} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Choose an email template:
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {calendarEventId}
                        <Button onClick={emailTypeFunction} variant="text">Confirmation</Button>
                        <Button onClick={emailTypeFunction} variant="text">Reminder</Button>
                        <Button onClick={emailTypeFunction} variant="text">Missed meeting</Button>
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Check for recording?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, overflowWrap: 'break-word', overflow: 'auto' }}>
                        {joinUrl}
                        <Button onClick={findRecording} variant="text">Yes</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}