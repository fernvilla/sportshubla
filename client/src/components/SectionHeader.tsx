import { Box, Heading } from '@chakra-ui/core';
import React from 'react';

interface Props {
  title: string;
}

const SectionHeader = ({ title }: Props) => {
  return (
    <Heading as="h1" size="sm" textTransform="uppercase" mb={3} fontWeight="normal">
      {title}
      <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
    </Heading>
  );
};

export default SectionHeader;
