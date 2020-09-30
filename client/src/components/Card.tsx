import React from 'react';
import { Box } from '@chakra-ui/core';
import { BoxProps } from '@chakra-ui/core/dist/Box';

type Props = BoxProps & {
  children: React.ReactNode;
};

const Card = ({ children, ...rest }: Props) => {
  return (
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" {...rest}>
      {children}
    </Box>
  );
};

export default Card;
