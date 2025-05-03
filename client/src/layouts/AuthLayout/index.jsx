import { Box, Center } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services';

export const AuthLayout = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
        (async () => {
            const { isAuthenticated } = await UserService.auth()
            if (isAuthenticated) {
                navigate('/chats/@me', { replace: true });
            }
        })()
    }, []);

    return (
        <Box
            backgroundImage="url('/assets/253152.svg')"
            backgroundColor="gray.800"
            backgroundSize="cover"
            backgroundPosition="center"
            h="100vh"
            w="100vw"
            className="bg"
            userSelect={"none"}
        >
            <Center h="100vh">
                <Outlet />
            </Center>
        </Box>
    );
};