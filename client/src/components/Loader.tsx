import React from 'react';
import { Flex, Spinner } from '@chakra-ui/core';

const Loader = () => {
  return (
    <Flex justify="center" w="100%" p={10}>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue.900" size="lg" />
    </Flex>
  );
};

export default Loader;
