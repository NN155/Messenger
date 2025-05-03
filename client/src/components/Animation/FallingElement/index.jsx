import { Box, keyframes } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// Анімація падіння
const fallEffect = keyframes`
  0% {
    transform: translateY(-120px) scale(1.03);
    opacity: 0;
  }
  50% {
    transform: translateY(8px) scale(1.01);
    opacity: 1;
  }


  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

export const FallingElement = ({ children }) => {
  const [hasFallen, setHasFallen] = useState(false);

  useEffect(() => {
    setHasFallen(true);
  }, []);

  return (
    <Box
      as="div"
      animation={hasFallen ? `${fallEffect} 0.6s cubic-bezier(0.33, 1.1, 0.68, 1) forwards` : 'none'}
      display="inline-block"
    >
      {children}
    </Box>
  );
};