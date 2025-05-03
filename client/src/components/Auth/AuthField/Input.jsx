import React from 'react';
import {
    Box,
    FormControl,
    Input,
    Text,
} from '@chakra-ui/react';

import { Label } from './Label';

import { useAuthFieldContext } from '.';

export const InputField = () => {
    const {
        labelError,
        type,
        id,
        value,
        onChange,
        sx,
        autoComplete,
        name,
        handleFocus,
        handleBlur,
    } = useAuthFieldContext();

    return (
        <Input
            id={id}
            name={name || id}
            type={type}
            color="white"
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            borderColor={labelError ? "red.500" : "gray.700"}
            bg="background.lower"
            autoComplete={autoComplete}
            _hover={{}}
            _focus={{
                boxShadow: "0 0 0 1px #4299E1",
                borderColor: "blue.500"
            }}
            _placeholder={{ color: "gray.400" }}
            sx={sx}
        />
    );
};

export default InputField;