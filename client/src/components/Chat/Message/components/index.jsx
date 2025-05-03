import { Box, HStack } from '@chakra-ui/react';
import { useSelector } from "react-redux";
import { darken } from '@chakra-ui/theme-tools';
import { Avatar, TextContent, UserInfo } from '..';

const Message = ({ text, senderId, showUserInfo, createdAt }) => {
    const { avatar, nickname } = useSelector(state => state.users.usersInfo[senderId]);
    return (
        <Box
            marginTop={showUserInfo ? "20px" : 0}
            paddingInline="4"
            color='white'
            alignSelf='flex-start'
            minWidth="100%"
            _hover={{ bg: darken('gray.700', 5) }}
            paddingY="3px"
        >
            <HStack
                spacing={3}
                position="relative"
                paddingLeft={"4em"}
            >
                <Avatar
                    src={avatar}
                    name={nickname}
                    showUserInfo={showUserInfo}
                />
                <Box>
                    <UserInfo
                        nickname={nickname}
                        createdAt={createdAt}
                        showUserInfo={showUserInfo}
                    />
                    <Box display="flex" alignItems="center">
                        <TextContent>{text}</TextContent>
                    </Box>
                </Box>
            </HStack>
        </Box>
    );
};

export default Message;
