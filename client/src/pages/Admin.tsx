import React from 'react';
import { Box } from '@chakra-ui/core';

const Admin = () => {
  return (
    <Box maxWidth={1600} margin="auto" p={10}>
      <Box fontWeight="medium" textTransform="uppercase" mb={2}>
        Admin
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.500"></Box>
      </Box>
    </Box>
  );
};

export default Admin;
