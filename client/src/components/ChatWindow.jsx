import React, { useState, useEffect, useContext } from 'react';
import { Launcher } from 'react-chat-window';
import { GeminiFunction } from './GeminiFunction';
import { textStreamContextFunction } from "../Contexts/textStreamContext";

const ChatWindow = () => {
    const [messageList, setMessageList] = useState([]);
    const { textStream, setTextStream } = useContext(textStreamContextFunction());

    useEffect(() => {
        _sendMessage(textStream);
    }, [textStream]);

    const _onMessageWasSent = async (message) => {
        if (message.author === 'them') {
            setMessageList(prevMessageList => [...prevMessageList, message]);
        } else {
            setMessageList(prevMessageList => [...prevMessageList, message]);
            const promptResult = await GeminiFunction(message.data.text,setTextStream);
            // _sendMessage(promptResult);
        }
    };

    const _sendMessage = (text) => {
        if (text.length > 0) {
            setMessageList(prevMessageList => [...prevMessageList, {
                author: 'them',
                type: 'text',
                data: { text }
            }]);
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
