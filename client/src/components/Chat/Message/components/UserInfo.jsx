import { HStack, Text } from '@chakra-ui/react';
import { TimeText } from '../../../';

const UserInfo = ({ userName, createdAt, showUserInfo }) => {
    if (!showUserInfo) return null;
    return (
        <HStack spacing={3}>
            <Text as="h1">{userName}</Text>
            <TimeText fontSize="12px" color="gray.400">{createdAt}</TimeText>
        </HStack>
    );
}

export default UserInfo;