import React from 'react';
import { Box, Flex, Heading, PseudoBox, Text } from '@chakra-ui/core';
import { default as TweetInterface } from './../../interfaces/tweet';
import Tweet from './Tweet';
import Loader from '../Loader';
import { FaRedo, FaRegFrown, FaAngleDoubleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type Props = {
  tweets?: TweetInterface[];
  isFetching: Boolean;
  tweetsPerPage?: number;
  displayTeamLink?: boolean;
  refetchData?: () => void;
};

const TweetsPreview = ({ tweets = [], isFetching = false, refetchData }: Props) => {
  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
          Latest Tweets
          <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
        </Heading>

        {refetchData && (
          <PseudoBox
            _hover={{ color: 'blue.500' }}
            transition="color 0.5s ease"
            cursor="pointer"
            onClick={refetchData}
            color="blue.700"
            title="Refresh"
          >
            <FaRedo />
          </PseudoBox>
        )}
      </Flex>

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
                  <Flex color="blue.700" alignItems="center">
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
