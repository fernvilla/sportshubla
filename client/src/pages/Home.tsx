import React from 'react';
import { TweetData } from '../interfaces/tweet';
import { Box, Flex } from '@chakra-ui/core';
import useAxios from '../hooks/useAxios';
import { YoutubeVideoData } from '../interfaces/youtubeVideo';
import { ArticleData } from '../interfaces/article';
import ArticlesPreview from '../components/articles/ArticlesPreview';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import TweetsPreview from '../components/tweets/TweetsPreview';
import YoutubeVideosPreview from '../components/videos/YoutubeVideosPreview';

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
    <Box as="main" maxW={CONTENT_WRAPPER_WIDTH} mx="auto">
      <Box px={3} pt={5}>
        <YoutubeVideosPreview
          videos={videos}
          isFetching={fetchingVideos}
          refetchData={refetchVideos}
        />
      </Box>

      <Flex pt={5} flexWrap="wrap" flexDir="row">
        <Box px={3} flex="5" minWidth={400}>
          <ArticlesPreview
            articles={articles}
            refetchData={refetchArticles}
            isFetching={fetchingArticles}
          />
        </Box>

        <Box px={3} flex="3" minWidth={400}>
          <TweetsPreview tweets={tweets} isFetching={fetchingTweets} refetchData={refetchTweets} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
