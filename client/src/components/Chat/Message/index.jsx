import React from 'react';
import { Box, Text, Avatar, HStack } from '@chakra-ui/react';
import { useSelector } from "react-redux";


export const Message = ({ text, senderId }) => {
  const { avatar, userName } = useSelector(state => state.users.usersInfo[senderId]);
  return (
    <Box
      mb={2}
      p={4}
      borderRadius="md"
      bg={senderId === 'me' ? 'blue.500' : 'gray.300'}
      color={senderId === 'me' ? 'white' : 'black'}
      alignSelf={senderId === 'me' ? 'flex-end' : 'flex-start'}
      maxWidth="80%" // обмежує ширину повідомлення
    >
      <HStack spacing={3}>
        <Avatar src={avatar} name={userName} size="sm" />
        <Box>
          <Text fontSize="sm" fontWeight="bold">{userName}</Text>
          <Text>{text}</Text>
        </Box>
      </HStack>
    </Box>
  );
};
