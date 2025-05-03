import { Button } from '@chakra-ui/react';
import React from 'react';

import { PointsLoading } from '../../Animation';

export const AuthSubmitButton = ({ isLoading, children }) => {

    return (
        <Button
            type="submit"
            fontSize="md"
            width="full"
            bg="blue.500"
            _hover={{ bg: 'blue.600' }}
            color="white"
            borderColor="blue.500"
            borderWidth={1}
        >
            {
                isLoading ?
                    <PointsLoading />
                    :
                    <>
                        {children}
                    </>
            }
        </Button>
    )
};
