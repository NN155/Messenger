import React from 'react';
import { Chat, ScrollBar } from '../../components';
import { MessageService } from '../../services';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const MessagesLayout = () => {
    const { id } = useParams();
    const [messages, setMessages] = React.useState([]);

    const chatMessages = useSelector((state) => state.messages.chats[id]);

    React.useEffect(() => {
        if (chatMessages) {
            setMessages(chatMessages);
        }
    }, [chatMessages]);

    React.useEffect(() => {
        MessageService.getMessages({
            chatId: id,
            start: 0,
            limit: 100,
        });
    }, [id]);
    
    return (
        <ScrollBar 
            className="messages-section"
        >
            {messages.map((message, index) => (
                <Chat.Message key={index} {...message}/>
            ))}
        </ScrollBar>
    );
};
