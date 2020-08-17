import React from 'react';
import { Text, Box } from '@chakra-ui/core';

const NotFound = () => {
  return (
    <Box m={5} p={10} bg="white" boxShadow="sm">
      <Text textAlign="center" fontWeight="bold" fontSize="3xl">
        Ooops...404. Page Not Found
      </Text>
    </Box>
  );
};

export default NotFound;
