import React, { useState, useEffect, useContext } from 'react';
import { Launcher } from 'react-chat-window';
import { GeminiFunction } from './GeminiFunction';
import { textStreamContextFunction } from "../../Contexts/textStreamContext";
import { chatContextFunction } from "../../Contexts/chatContext";

const ChatWindow = () => {
    const { messageList, setMessageList } = useContext(chatContextFunction());
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
        if (message.author === 'them') {
            setMessageList(prevMessageList => [...prevMessageList, message]);
        } else {
            setMessageList(prevMessageList => [...prevMessageList, message]);
            const promptResult = await GeminiFunction(message.data.text, setTextStream);
            // _sendMessage(promptResult);
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
