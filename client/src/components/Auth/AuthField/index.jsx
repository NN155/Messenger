import React from 'react';
import { FormControl } from '@chakra-ui/react';

import Label from './Label';
import Input from './Input';
import Hint from './Hint';

const AuthFieldContext = React.createContext({});

export const AuthField = ({
    label,
    labelError,
    type = "text",
    errorMode = false,
    id,
    value,
    onChange,
    hint,
    sx,
    showHint = true,
    autoHide = true,
    autoComplete = "off",
    name,
    required = false,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleFocus = () => {
        if (hint?.text && showHint) {
            setIsOpen(true);
        }
    };

    const handleBlur = () => {
        if (autoHide) {
            setIsOpen(false);
        }
    };

    if (errorMode && !value && required) {
        labelError = "Required";
    }

    return (
        <AuthFieldContext.Provider value={{     
            label,
            labelError,
            type,
            errorMode,
            id,
            value,
            onChange,
            sx,
            showHint,
            hint,
            autoHide,
            autoComplete,
            name,
            required,
            handleBlur,
            handleFocus,
            isOpen,
            }}>

            <FormControl 
            mb={4}
            >
                <Label/>
                <Input/>
                <Hint/>
            </FormControl>
        </AuthFieldContext.Provider>
    );
};

export const useAuthFieldContext = () => {
    const context = React.useContext(AuthFieldContext);
    return context;
};