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
    <Box w="100%" minH="100%" bg="gray.200">
      <Flex>
        <Box flex="0 0 225px" minH="100vh">
          <SideNav leagues={leagues} />
        </Box>

        <Box flex="auto">
          <SiteHeader />

          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default SiteLayout;
