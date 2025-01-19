import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from "./IconButton";
import { calendarContextFunction } from '../../Contexts/calendarContext';
import { missedMeetingTemplate, confirmationTemplate, reminderTemplate } from "../Chat Components/emailTemplateRules";
import { GeminiFunction } from "../Chat Components/GeminiFunction";
import { textStreamContextFunction } from "../../Contexts/textStreamContext";
import { chatContextFunction } from "../../Contexts/chatContext";

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

export default function BasicModal({ calendarEventId, Icon }) {
    const { graphData, setGraphData } = React.useContext(calendarContextFunction());
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { setTextStream } = React.useContext(textStreamContextFunction());
    const { setMessageList } = React.useContext(chatContextFunction());

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
        ParseTextToChat(selectedEmailTemplate, selectedEventHTML.body.content);
        handleClose();
    }

    const ParseTextToChat = (selectedEmailTemplate, htmlInvitation) => {
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
        result(queryForEmail);

    }

    const result = async (queryForEmail) => {
        const promptResult = await GeminiFunction(queryForEmail, setTextStream);
        return promptResult;
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
                </Box>
            </Modal>
        </div>
    );
}