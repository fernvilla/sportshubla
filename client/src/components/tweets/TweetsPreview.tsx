import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { default as TweetInterface } from './../../interfaces/tweet';
import Tweet from './Tweet';
import Loader from '../Loader';
import { FaRegFrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';

type Props = {
  tweets?: TweetInterface[];
  isFetching: Boolean;
};

const TweetsPreview = ({ tweets = [], isFetching = false }: Props) => {
  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm">
      <SectionHeader title="Latest Tweets" />

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Box overflow="auto">
            {tweets.map((tweet, i) => (
              <Tweet
                key={tweet.id}
                tweet={tweet}
                displayTeamLink
                noBorder={i === tweets.length - 1}
              />
            ))}
          </Box>

          {!!tweets.length ? (
            <Box marginBottom={-6}>
              <Flex justifyContent="flex-end" pb={3}>
                <Link to="/tweets">
                  <Flex color="blue.700" p={1} alignItems="center">
                    <Text>View all</Text>
                  </Flex>
                </Link>
              </Flex>
            </Box>
          ) : (
            <Flex justifyContent="center" padding={5}>
              <Box textAlign="center">
                <Flex justifyContent="center" fontSize="2xl">
                  <FaRegFrown />
                </Flex>
                No Tweets Available
              </Box>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default TweetsPreview;
