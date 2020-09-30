import React from 'react';
import useAxios from '../hooks/useAxios';
import { Box } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import { TweetData } from '../interfaces/tweet';
import TweetFeed from '../components/tweets/TweetFeed';

const Tweets = () => {
  const { response, isLoading }: TweetData = useAxios({
    url: '/api/tweets'
  });

  return (
    <Box px={3} py={5} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto">
      <TweetFeed tweets={response} isFetching={isLoading} tweetsPerPage={20} displayTeamLink />
    </Box>
  );
};

export default Tweets;
