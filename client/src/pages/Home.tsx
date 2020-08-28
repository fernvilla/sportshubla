import React from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Box, Flex } from '@chakra-ui/core';
import ArticlesFeed from '../components/feed/ArticlesFeed';
import TweetsFeed from '../components/feed/TweetsFeed';
import useAxios from '../hooks/useAxios';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import { YoutubeVideo } from '../interfaces/youtubeVideo';
import YoutubeFeed from '../components/feed/YoutubeFeed';

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

  console.log({ videos });

  return (
    <Box as="main">
      <Flex py={10} flexWrap="wrap" flexDir="row" maxW={CONTENT_WRAPPER_WIDTH} mx="auto">
        <Box px={5} flex="3" minWidth={400}>
          <ArticlesFeed articles={articles} isFetching={fetchingArticles} displayTeamLink />
        </Box>

        <Box px={5} flex="1" minWidth={400}>
          <TweetsFeed tweets={tweets} isFetching={fetchingTweets} displayTeamLink />
          <YoutubeFeed videos={videos} isFetching={fetchingVideos} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
