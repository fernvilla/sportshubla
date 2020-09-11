import { Box, Flex, Text } from '@chakra-ui/core';
import React from 'react';

const Footer = () => {
  const date = new Date();

  return (
    <Flex
      as="footer"
      bg="brand"
      minHeight="100px"
      color="white"
      alignItems="center"
      justifyContent="center"
      p={10}
    >
      <Box fontSize="xs" textAlign="center">
        <Text mb={3}>{date.getFullYear()} - Sports Hub Los Angeles</Text>

        <Text mb={1}>
          Disclaimer: This is an unofficial fansite. This site is not officially sponsored or
          supported by, or affiliated with, the sports teams and organizations, players, athletes,
          television networks, shows, games, entertainment companies, celebrities, entities, or any
          other third party appearing on and/or subject of this site (collectively “Third Parties”).
        </Text>

        <Text mb={1}>
          All of the Third Parties’ intellectual property, including trademarks, logos, and designs
          used on this site belong to their rightful owners. No claims are made to the intellectual
          property rights belonging to the Third Parties.
        </Text>
      </Box>
    </Flex>
  );
};

export default Footer;
