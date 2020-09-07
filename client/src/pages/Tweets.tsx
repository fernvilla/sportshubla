import React from 'react';
import TweetsFeed from '../components/tweets/TweetsFeed';
import useAxios from '../hooks/useAxios';
import { Box } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import { TweetData } from '../interfaces/tweet';

const Tweets = () => {
  const { response, isLoading, refetch }: TweetData = useAxios({
    url: '/api/tweets'
  });

  return (
    <Box px={3} py={5} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto">
      <TweetsFeed
        tweets={response}
        isFetching={isLoading}
        refetchData={refetch}
        tweetsPerPage={20}
        displayTeamLink
      />
    </Box>
  );
};

export default Tweets;
