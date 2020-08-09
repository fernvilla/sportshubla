import React, { FC } from 'react';
import SiteHeader from './SiteHeader';
import { Flex, Box } from '@chakra-ui/core';
import { League } from '../../interfaces/league';
import SideNav from './SideNav';

type Props = {
  leagues: League[];
};

const SiteLayout: FC<Props> = props => {
  const { children, leagues } = props;

  return (
    <Box w="100%" minH="100%">
      <Flex flexDir="row">
        <Box pos="fixed" minH="100vh" height="100%" width={220} overflow="auto">
          <SideNav leagues={leagues} />
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
