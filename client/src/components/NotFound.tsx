import React from 'react';
import { Text, Box } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';

const NotFound = () => {
  return (
    <Box m={5} p={10} bg="white" boxShadow="sm" maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto">
      <Text textAlign="center" fontWeight="bold" fontSize="3xl">
        Ooops...404. Page Not Found
      </Text>
    </Box>
  );
};

export default NotFound;
