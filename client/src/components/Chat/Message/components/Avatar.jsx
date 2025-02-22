import { Avatar as ChakraAvatar } from "@chakra-ui/react";

const Avatar = ({ showUserInfo, src, name }) => {
    if (!showUserInfo) return null;

    return (
        <ChakraAvatar
            src={src}
            name={name}
            size="md"
            position="absolute"
            left="0px"
        />
    );
};

export default Avatar;