import React, { ReactNode, useContext } from 'react';
import { Flex, Box } from '@chakra-ui/core';
import Navbar from './Navbar';
import Footer from './Footer';
import TeamContext from '../../contexts/TeamContext';

type Props = {
  children: ReactNode;
};

const SiteLayout = (props: Props) => {
  const { teams } = useContext(TeamContext);
  const { children } = props;

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
