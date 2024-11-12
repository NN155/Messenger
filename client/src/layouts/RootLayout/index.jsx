import { Outlet } from 'react-router-dom';
import { Sidebar, ChatSection } from './components';
import { Grid, GridItem } from '@chakra-ui/react';

export const RootLayout = () => {
    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" height="100vh">
                <GridItem colSpan={1}>
                    <Sidebar />
                </GridItem>
                <GridItem colSpan={11}>
                    <ChatSection>
                        <Outlet />
                    </ChatSection>
                </GridItem>
            </Grid>
        </>
    )
}