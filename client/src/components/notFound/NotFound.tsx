import React, { FC } from 'react';
import { Text, Box } from '@chakra-ui/core';

const NotFound: FC = () => {
  return (
    <Box maxWidth={1600} mx="auto" my={5}>
      <Text textAlign="center">404. Page Not Found</Text>
    </Box>
  );
};

export default NotFound;
