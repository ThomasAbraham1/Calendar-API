import React, { useState, useEffect, useContext } from 'react';
import { Launcher } from 'react-chat-window';
import { GeminiFunction } from './GeminiFunction';
import { textStreamContextFunction } from "../../Contexts/textStreamContext";
import { chatContextFunction } from "../../Contexts/chatContext";
import { toasterContextFunction } from '../../Contexts/toasterContext';


const ChatWindow = () => {
    const { messageList, setMessageList } = useContext(chatContextFunction());
    const { Toaster, toast } = useContext(toasterContextFunction());

    // const [messageList, setMessageList] = useState([]);
    const { textStream, setTextStream } = useContext(textStreamContextFunction());

    useEffect(() => {
        const _sendMessage = (text) => {
            if (text.length > 0) {
                setMessageList(prevMessageList => [...prevMessageList, {
                    author: 'them',
                    type: 'text',
                    data: { text }
                }]);
            }
        };
        _sendMessage(textStream);
    }, [textStream, setMessageList]);

    const _onMessageWasSent = async (message) => {
        console.log(message);
        var chatInputType = 'directMethod'
        if (message.author === 'them') {
            setMessageList(prevMessageList => [...prevMessageList, message]);
        } else {
            setMessageList(prevMessageList => [...prevMessageList, message]);
            // const promptResult = await GeminiFunction(message.data.text, setTextStream);
            const promptResult = new Promise((resolve, reject) => {
                GeminiFunction(message.data.text, setTextStream, resolve, reject, chatInputType);
            })
            toast.promise(promptResult, {
                loading: 'Loading...',
                success: (data) => {
                    return `${data.name}`;
                },
                error: (data) => "Error " + data.status + " - " + data.response.data.error,
            });
        }
    };



    const someMethod = (textStream) => {
        console.log(textStream);
    };

    return (
        <div>
            <Launcher
                agentProfile={{
                    teamName: 'Your AI buddy',
                    imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                }}
                onMessageWasSent={_onMessageWasSent}
                messageList={messageList}
                showEmoji
            />
        </div>
    );
};

export default ChatWindow;
