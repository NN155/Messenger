import React from 'react';
import {
    FormLabel,
    Text,
    Box,
} from '@chakra-ui/react';

import { useAuthFieldContext } from '.';

const Label = () => {
    const {
        label,
        labelError,
        id,
        required,
    } = useAuthFieldContext();
    const red = "red.400";

    return (
        <FormLabel
            htmlFor={id}
            color="white"
        >
            {label &&
                <Text
                    fontSize="xs"
                    color={labelError ? red : "white"}
                    mb={1}
                    textTransform="uppercase"
                    fontFamily="Roboto"
                    fontWeight={400}
                >
                    {label}
                    {!labelError ?
                        required &&
                        <Box as="span" color={red} ml={1}>*</Box>
                        :
                        labelError && <>
                            <Box as="span" ml={1} color={red} fontSize="xs">-</Box>
                            <Box as="span" ml={1} color={red} fontSize="xs" fontStyle="italic" textTransform="none">{labelError}</Box>
                        </>
                    }
                </Text>
            }

        </FormLabel>

    );
};

export default Label;