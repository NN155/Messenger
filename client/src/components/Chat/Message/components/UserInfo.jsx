import { HStack, Text } from '@chakra-ui/react';
import { TimeText } from '../../../';

const UserInfo = ({ nickname, createdAt, showUserInfo }) => {
    if (!showUserInfo) return null;
    return (
        <HStack spacing={3}>
            <Text as="h1">{nickname}</Text>
            <TimeText fontSize="12px" color="gray.400">{createdAt}</TimeText>
        </HStack>
    );
}

export default UserInfo;