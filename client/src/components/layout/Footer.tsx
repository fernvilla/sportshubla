import { Box, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import { CONTENT_WRAPPER_WIDTH } from '../../globals/constants';

const Footer = () => {
  const date = new Date();

  return (
    <Box
      as="footer"
      bg="brand"
      minHeight="100px"
      color="white"
      p={10}
      fontSize="xs"
      textAlign="center"
      mt={5}
    >
      <Box maxWidth={CONTENT_WRAPPER_WIDTH} margin="auto">
        <Text mb={3}>{date.getFullYear()} - Sports Hub Los Angeles</Text>

        <Text mb={1}>
          Disclaimer: This is an unofficial fansite. This site is not officially sponsored or
          supported by, or affiliated with, the sports teams and organizations, players, athletes,
          television networks, media (or members of the media), shows, games, entertainment
          companies, celebrities, entities, or any other third party appearing on and/or subject of
          this site (collectively “Third Parties”).
        </Text>

        <Text mb={1}>
          All of the Third Parties’ intellectual property, including trademarks, logos, and designs
          used on this site belong to their rightful owners. No claims are made to the intellectual
          property rights belonging to the Third Parties.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
