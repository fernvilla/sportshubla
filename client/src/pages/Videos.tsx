import React from 'react';
import useAxios from '../hooks/useAxios';
import { Box } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import YoutubeFeed from '../components/videos/YoutubeFeed';
import { YoutubeVideoData } from '../interfaces/youtubeVideo';

const Videos = () => {
  const { response, isLoading }: YoutubeVideoData = useAxios({
    url: '/api/youtubevideos'
  });

  return (
    <Box px={3} py={5} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto">
      <YoutubeFeed videos={response} isFetching={isLoading} videosPerPage={20} displayTeamLink />
    </Box>
  );
};

export default Videos;
