import { Box } from '@chakra-ui/react';

export const Sidebar = ({...rest}) => {
    return (
        <>
            <Box
                as="nav"
                bg="gray.800"
                color="white"
                p="6"
                h="100vh"
                w="300px"
                {...rest}
            >
                Sidebar
            </Box>
        </>
    )
};