import React, { ReactNode } from 'react';
import SiteHeader from './SiteHeader';
import { Flex, Box } from '@chakra-ui/core';
import { Team } from '../../interfaces/team';
import SideNav from './SideNav';

type Props = {
  teams: Team[];
  children: ReactNode;
};

const SiteLayout = (props: Props) => {
  const { children, teams } = props;

  return (
    <Box w="100%" minH="100%">
      <Flex flexDir="row">
        <Box pos="fixed" minH="100vh" height="100%" width={220} overflow="auto">
          <SideNav teams={teams} />
        </Box>

        <Box marginLeft={220} width="100%">
          <SiteHeader />

          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default SiteLayout;
