import React from "react";
import { Input as InputChakra } from "@chakra-ui/react";

export const Input = ({ handle, onSend, value }) => {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onSend();
        }
    };

    return (
        <InputChakra
            type="text"
            placeholder="Type a message..."
            onChange={(e) => handle(e.target.value)}
            onKeyDown={handleKeyDown}
            value={value}
        />
    );
};
