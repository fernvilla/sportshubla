import React from 'react';
import { TweetData } from '../interfaces/tweet';
import { Box } from '@chakra-ui/core';
import useAxios from '../hooks/useAxios';
import { YoutubeVideoData } from '../interfaces/youtubeVideo';
import FeedLayout from '../components/feed/FeedLayout';
import { ArticleData } from '../interfaces/article';

const Home = () => {
  const {
    response: articles,
    isLoading: fetchingArticles,
    refetch: refetchArticles
  }: ArticleData = useAxios({
    url: '/api/articles/latest'
  });

  const {
    response: tweets,
    isLoading: fetchingTweets,
    refetch: refetchTweets
  }: TweetData = useAxios({
    url: '/api/tweets/latest'
  });

  const {
    response: videos,
    isLoading: fetchingVideos,
    refetch: refetchVideos
  }: YoutubeVideoData = useAxios({
    url: '/api/youtubevideos/latest'
  });

  return (
    <Box as="main">
      <FeedLayout
        articles={articles}
        fetchingArticles={fetchingArticles}
        refetchArticles={refetchArticles}
        tweets={tweets}
        fetchingTweets={fetchingTweets}
        refetchTweets={refetchTweets}
        videos={videos}
        fetchingVideos={fetchingVideos}
        refetchVideos={refetchVideos}
        displayTeamLink
      />
    </Box>
  );
};

export default Home;
