import React, { FC } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/core';
import { Tweet as TweetType } from 'src/interfaces/tweet';
import Tweet from './Tweet';

type Props = { tweets?: TweetType[]; isFetching: Boolean };

const SocialFeed: FC<Props> = ({ tweets = [], isFetching = false }) => {
  // const calcualteTotalPages = (dataLength: number, rowsPerPage: number) => {
  //   return Math.ceil(dataLength / rowsPerPage);
  // };

  return (
    <Box>
      <Box fontWeight="medium" textTransform="uppercase" mb={2}>
        Social Feed
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.500"></Box>
      </Box>

      {isFetching ? (
        <Flex justify="center" w="100%" p={10}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue.900" size="lg" />
        </Flex>
      ) : (
        <>
          {tweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </>
      )}
    </Box>
  );
};

export default SocialFeed;
