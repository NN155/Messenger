import { colors } from './colors';
import { global } from './global';
import { extendTheme } from '@chakra-ui/react';
import '@fontsource/roboto';

const theme = extendTheme({
    config: { cssVarPrefix: 'cl' },
    styles: { global },
    colors,
    fonts: {
        body: 'Whitney, sans-serif',
        heading: 'Roboto, sans-serif',
    },
    fontSizes: {
        'smd': '15px',
        'mdx': '17px',
    },
    
});

export default theme;