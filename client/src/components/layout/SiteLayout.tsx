import React, { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/core';
import { Team } from '../../interfaces/team';
import Navbar from './Navbar';

type Props = {
  teams: Team[];
  children: ReactNode;
};

const SiteLayout = (props: Props) => {
  const { children, teams } = props;

  return (
    <Box w="100%" minH="100%">
      <Flex flexDir="row">
        <Box width="100%">
          <Navbar teams={teams} />

          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default SiteLayout;
