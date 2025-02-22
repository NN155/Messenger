import { Box, HStack } from '@chakra-ui/react';
import { useSelector } from "react-redux";
import { darken } from '@chakra-ui/theme-tools';
import { Avatar, TextContent, UserInfo } from '..';

const Message = ({ text, senderId, showUserInfo, createdAt }) => {
    const { avatar, userName } = useSelector(state => state.users.usersInfo[senderId]);
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
                    name={userName}
                    showUserInfo={showUserInfo}
                />
                <Box>
                    <UserInfo
                        userName={userName}
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
