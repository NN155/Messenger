import {
    Heading,
    useToast,
    Text,
    Link as ChakraLink,
    Box,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import { AuthField, AuthBox, AuthSubmitButton } from '../../components';
import { UserService } from '../../services';

import { useNavigate } from 'react-router-dom';

export const LoginLayout = () => {

    const navigate = useNavigate();

    const [usernameOrEmail, setUsernameOrEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [errorMode, setErrorMode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [usernameOrEmailError, setUsernameOrEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);


    const cleanErrors = () => {
        setUsernameOrEmailError(false);
        setPasswordError(false);
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        cleanErrors();

        if (!usernameOrEmail || !password) {
            setErrorMode(true);
            return;
        }

        setLoading(true);
        const data = await UserService.login({ usernameOrEmail, password });
        setLoading(false);

        if (data.error) {
            setErrorMode(true);
            if (data.error === 'Wrong username/email or password') {
                setPasswordError('Wrong username/email or password');
                setUsernameOrEmailError('Wrong username/email or password');
            }
            return;
        }

        navigate('/chats/@me', { replace: true });
    };

    return (
        <AuthBox>
            <Heading as="h1" size="md" color={"white"}>
                Your welcome
            </Heading>
            <Box w="100%" p={2}>
                <form onSubmit={handleLogin}>

                    <AuthField
                        label="Username or Email"
                        name="identifier"
                        type="text"
                        value={usernameOrEmail}
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                        showHint={true}
                        required={true}
                        errorMode={errorMode}
                        labelError={usernameOrEmailError}
                    />
                    <AuthField
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showHint={true}
                        required={true}
                        errorMode={errorMode}
                        labelError={passwordError}
                    />
                    <AuthSubmitButton isLoading={loading}>
                        Log in
                    </AuthSubmitButton>
                    <Text mt={4} color="white" fontSize="xs">
                        Don't have an account?{' '}
                        <ChakraLink as={Link} to="/register" color="blue.400">
                            Register
                        </ChakraLink>
                    </Text>
                </form>
            </Box>
        </AuthBox>
    );
};