import {
    Heading,
    Text,
    Link as ChakraLink,
    Box,
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthField, AuthBox, AuthSubmitButton } from '../../components';

import { UserService } from '../../services';

export const RegisterLayout = () => {
    const [email, setEmail] = React.useState('');
    const [nickname, setNickname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [errorMode, setErrorMode] = React.useState(false);
    const [errorServer, setErrorServer] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [emailError, setEmailError] = React.useState(false);
    const [nicknameError, setNicknameError] = React.useState(false);
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const nicknameHint = {text: "It's your showed name. Everyone can see it.", type: ''};
    const [usernameHint, setUsernameHint] = React.useState({text: 'Your username must be unique and contain at least 3 characters.', type: ''});

    const navigate = useNavigate();

    const cleanErrors = () => {
        setEmailError(false);
        setNicknameError(false);
        setUsernameError(false);
        setPasswordError(false);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            email,
            nickname,
            username,
            password,
        };
        const requiredFields = ['email', 'username', 'password'];
        const isValid = requiredFields.every(field => data[field] !== '');
        if (!isValid) {
            setErrorMode(true);
            return;
        }
        setErrorMode(false);
        setErrorServer(false);
        cleanErrors();
        setLoading(true);

        const response = await UserService.register({
            email,
            nickname,
            username,
            password,
        });
        setLoading(false);
        if (response.errors) {
            setErrorServer(true);
            setErrorMode(true);
            if (response.errors.email) setEmailError(response.errors.email);
            if (response.errors.nickname) setNicknameError(response.errors.nickname);
            if (response.errors.username) setUsernameError(response.errors.username);
            if (response.errors.password) setPasswordError(response.errors.password);
            return;
        }

        navigate('/chats/@me', { replace: true });
    };
    const handleUsernameCheck = async (e) => {
        const value = e.target.value.toLowerCase();
        setUsername(value);
    }


    const usernameTimeoutRef = React.useRef(null);
    const usernameCache = React.useRef(null);

    React.useEffect(() => {
        if (username.length === 0) {
            setUsernameHint({text: 'Your username must be unique and contain at least 3 characters.', type: ''});
            return;
        }
        
        if (username.length < 3 || username.length > 32) {
            setUsernameHint({text: "Username must be between 3 and 32 characters.", type: "error"});
            return;
        }
        
        if (usernameTimeoutRef.current) {
            clearTimeout(usernameTimeoutRef.current);
        }
        usernameCache.current = username;
        usernameTimeoutRef.current = setTimeout(async () => {
            try {
                const {isAvailable} = await UserService.checkUsernameAvailability(username);
                if (usernameCache.current !== username) {
                    return;
                }
                if (isAvailable) {
                    setUsernameHint({text: "Username is available.", type: "success"});
                } else {
                    setUsernameHint({text: "This username is already taken. Try adding numbers or different characters.", type: "error"});
                }
            } catch (error) {
                console.error("Error checking username:", error);
                setUsernameHint({text: "Could not verify username availability.", type: "error"});
            }
        }, 1000);
        
        return () => {
            if (usernameTimeoutRef.current) {
                clearTimeout(usernameTimeoutRef.current);
            }
        };
    }, [username]); 

    return (
        <AuthBox>
            <Heading as="h1" size="md" color={"white"}>
                Create an account
            </Heading>
            <Box w="100%" p={2}>
                <form onSubmit={handleRegister} autoComplete='off'>
                    <AuthField
                        label="Email"
                        labelError={emailError}
                        errorMode={errorMode}
                        name="email"
                        type="email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        showHint={true}
                        required={true}
                    />
                    <AuthField
                        label="Showed name"
                        labelError={nicknameError}
                        errorMode={errorMode}
                        name="nickname"
                        type="text"
                        value={nickname}
                        onChange={(e) => {
                            const maxLength = 32;
                            const value = e.target.value.length > maxLength
                                ? e.target.value.slice(0, maxLength)
                                : e.target.value
                            setNickname(value);
                        }}
                        hint={nicknameHint}
                        showHint={true}
                        required={false}
                    />
                    <AuthField
                        label="Username"
                        labelError={usernameError}
                        errorMode={errorMode}
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => handleUsernameCheck(e)}
                        showHint={true}
                        required={true}
                        hint={usernameHint}
                    />
                    <AuthField
                        label="Password"
                        labelError={passwordError}
                        errorMode={errorMode}
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <AuthSubmitButton isLoading={loading}>
                        Create
                    </AuthSubmitButton>

                    <Box mt={4} mb={2}>
                        {
                            errorServer && <Text color="red.500" fontSize="xs" >Oops, something went wrong!</Text>
                        }
                        <Text fontSize="xs" color="white">
                            <ChakraLink as={Link} to="/login" color="blue.400">
                                Do you have an account?
                            </ChakraLink>
                        </Text>
                    </Box>
                </form>
            </Box>
        </AuthBox >
    );
};