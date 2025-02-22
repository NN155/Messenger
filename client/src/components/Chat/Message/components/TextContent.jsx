import { Text } from '@chakra-ui/react';

const TextContent = ({ children }) => {
    return (
        <Text as="p" wordBreak="break-word" whiteSpace="normal">
            {children}
        </Text>
    )
};

export default TextContent;