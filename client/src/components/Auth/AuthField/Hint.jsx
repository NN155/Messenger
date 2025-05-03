import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAuthFieldContext } from '.';

const Hint = () => {
    const {
        showHint,
        isOpen,
        hint,
    } = useAuthFieldContext();
    
    if (!hint || !showHint) {
        return null;
    }

    const shouldShowHint = isOpen || (hint.type === "error" && hint.text);

    const renderHintContent = () => {
        switch (hint.type) {
            case "error":
                return <Text color="red.400" fontSize="xs">{hint.text}</Text>;
            case "success":
                return <Text color="green.400" fontSize="xs">{hint.text}</Text>;
            default:
                return <Text color="white" fontSize="xs">{hint.text}</Text>;
        }
    };

    return (
        <Box
            overflow="hidden"
            transition="max-height 0.5s ease, padding 0.5s ease"
            maxHeight={shouldShowHint ? "200px" : "0px"}
            padding={shouldShowHint ? "12px 0" : "0px"}
        >
            <Box
                color="white"
                transform={shouldShowHint ? "translateY(0px)" : "translateY(50px)"}
                opacity={shouldShowHint ? 1 : 0}
                transition="transform 0.6s ease, opacity 0.6s ease"
            >
                {renderHintContent()}
            </Box>
        </Box>
    );
};

export default Hint;