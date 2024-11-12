import { colors } from './colors';
import { global } from './global';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: { cssVarPrefix: 'cl' },
    styles: { global },
    colors,
    fonts: {
        body: 'Roboto',
        heading: 'Roboto',
    },
});

export default theme;