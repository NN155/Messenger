import React from "react";
import { Grid } from "@chakra-ui/react";
import { MessagesLayout, InputLayout } from ".."

export const ChatLayout = () => {
    
    return (
        <Grid
        templateRows="1fr auto"
        height="100%"
        className="chat-layout"
        >
            <MessagesLayout />
            <InputLayout />
        </Grid>
    );
}