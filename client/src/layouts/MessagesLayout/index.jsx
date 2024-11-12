import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Chat } from '../../components';
import { MessageService, UserService } from '../../services';
import { useParams } from 'react-router-dom';
export const MessagesLayout = () => {
    const { id } = useParams();
    const [messages, setMessages] = React.useState([]);
    
    React.useEffect(() => {
        MessageService.getMessages({
            chatId: id,
            start: 0,
            limit: 20,
        }).then(async (messages) => {
            for (let i = 0; i < messages.length; i++) {
                await UserService.addUserInfo(messages[i].senderId);
            }
            setMessages(messages);
        });
    }, []);

    return (
        <Flex
            direction="column"
            flex="1"
            overflowY="auto"
            bg="gray.100"
            borderRadius="md"
            p={4}
        >
            {messages.map((message, index) => (
                <Chat.Message key={index} {...message}/>
            ))}
        </Flex>
    );
};
