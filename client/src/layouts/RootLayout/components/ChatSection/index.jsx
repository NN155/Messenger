import React from 'react';
import { Box } from '@chakra-ui/react';

export const ChatSection = ({ children, ...rest }) => {
    return (
        <Box
            as="section"
            bg="gray.700"
            color="white"
            p="6"
            w="100%"
            h="100vh"
            {...rest}
        >
            {children}
        </Box>
    )
}