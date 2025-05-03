import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserService } from '../../services';
import { Box, Text, Spinner, Center } from '@chakra-ui/react';

export const ProtectedLayout = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { isAuthenticated, user } = await UserService.auth()
      if (!isAuthenticated) {
        navigate('/login');
      } else {
        setChecked(true);
      }
    }
    )()
  }, []);


  return (
    <Box
      width="100%"
      height="100vh"
      bg="gray.800"
    >
      {checked ?
        <Outlet />
        :
        <Center
          width="100%"
          height="100vh"
          bg="gray.800"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      }
    </Box>
  );
};