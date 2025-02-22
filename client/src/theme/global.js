import { darken } from '@chakra-ui/theme-tools';

export const global = {
    body: {
      color: 'gray.800',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: '500',
      fontSize: 'lg',
      letterSpacing: '0.04em'
    },
    'p, span': {
      fontWeight: '300',
      fontSize: 'smd',
      color: darken('#ffffff', 7),
      letterSpacing: '0.02em'
    },
};