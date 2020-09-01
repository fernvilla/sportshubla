import React from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Box } from '@chakra-ui/core';
import useAxios from '../hooks/useAxios';
import { YoutubeVideo } from '../interfaces/youtubeVideo';
import FeedLayout from '../components/feed/FeedLayout';

interface ArticleData {
  response: Article[];
  isLoading: boolean;
}

interface TweetData {
  response: Tweet[];
  isLoading: boolean;
}

interface VideoData {
  response: YoutubeVideo[];
  isLoading: boolean;
}

const Home = () => {
  const { response: articles, isLoading: fetchingArticles }: ArticleData = useAxios({
    url: '/api/articles/latest'
  });

  const { response: tweets, isLoading: fetchingTweets }: TweetData = useAxios({
    url: '/api/tweets/latest'
  });

  const { response: videos, isLoading: fetchingVideos }: VideoData = useAxios({
    url: '/api/youtubevideos/latest'
  });

  return (
    <Box as="main">
      <FeedLayout
        articles={articles}
        fetchingArticles={fetchingArticles}
        tweets={tweets}
        fetchingTweets={fetchingTweets}
        videos={videos}
        fetchingVideos={fetchingVideos}
        displayTeamLink
      />
    </Box>
  );
};

export default Home;
