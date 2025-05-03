import { VStack, Box } from '@chakra-ui/react';
import { FallingElement } from '../..';

export const AuthBox = ({children}) => {
    return (
        <FallingElement>
            <Box w="450px" display="block">
                <VStack spacing={4} p={8} bg="background.higher" borderRadius="md" boxShadow="xl">
                    {children}
                </VStack>
            </Box>
        </FallingElement>
    )
}