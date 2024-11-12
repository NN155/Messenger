import React from "react";
import { Chat } from "../../components";
import { MessageService } from "../../services";
import { useParams } from 'react-router-dom';

export const InputLayout = () => {
    const { id } = useParams();
    const [message, setMessage] = React.useState("");

    const handleSendMessage = (message) => {
        setMessage(message);
    };

    const onSend = () => {
        MessageService.sendMessage({ text: message, chatId: id});
        setMessage("");
    };

    return (
        <Chat.Input handle={handleSendMessage} onSend={onSend} value={message}/>
    );
};
