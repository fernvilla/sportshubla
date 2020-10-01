import React, { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/core';
import { Team } from '../../interfaces/team';
import Navbar from './Navbar';
import Footer from './Footer';

type Props = {
  teams: Team[];
  children: ReactNode;
};

const SiteLayout = (props: Props) => {
  const { children, teams } = props;

  return (
    <Box w="100%" minH="100%">
      <Flex width="100%" flexDir="column" height="100vh">
        <Navbar teams={teams} />

        <Box flex="1 0 auto">{children}</Box>

        <Footer />
      </Flex>
    </Box>
  );
};

export default SiteLayout;
