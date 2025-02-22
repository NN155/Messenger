import { Flex } from '@chakra-ui/react';
import useAutoScroll from '../../hooks/useAutoScroll';

const ScrollBar = ({ children, ...rest }) => {
    const containerRef = useAutoScroll(children);

    const scrollbarStyles = {
        '::-webkit-scrollbar': {
            width: '8px',
        },
        '::-webkit-scrollbar-track': {
            background: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#2c2f33',
            borderRadius: '4px',
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: '#23272a',
        },
    };

    return (
        <Flex
            ref={containerRef}
            direction="column-reverse"
            flex="1"
            overflowY="auto"
            borderRadius="md"
            css={scrollbarStyles}
            {...rest}
        >
            {children}
        </Flex>
    );
}

export default ScrollBar