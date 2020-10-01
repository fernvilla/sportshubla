import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import YoutubeFeed from './../videos/YoutubeFeed';
import Article from '../../interfaces/article';
import Tweet from '../../interfaces/tweet';
import { YoutubeVideo } from '../../interfaces/youtubeVideo';
import { CONTENT_WRAPPER_WIDTH } from '../../globals/constants';
import ArticleFeed from '../articles/ArticleFeed';
import TweetFeed from '../tweets/TweetFeed';

interface Props {
  articles: Article[];
  fetchingArticles?: boolean;
  tweets: Tweet[];
  fetchingTweets?: boolean;
  videos: YoutubeVideo[];
  fetchingVideos?: boolean;
  displayTeamLink?: boolean;
  isPreview?: boolean;
}

const FeedLayout = (props: Props) => {
  const {
    articles = [],
    fetchingArticles = false,
    tweets = [],
    fetchingTweets = false,
    videos = [],
    fetchingVideos = false,
    displayTeamLink,
    isPreview = false
  } = props;

  return (
    <Box as="main" maxW={CONTENT_WRAPPER_WIDTH} mx="auto" pt={5}>
      <Flex flexWrap="wrap" flexDir="row">
        <Box mx={3} flex="5 1 400px">
          <ArticleFeed
            articles={articles}
            isFetching={fetchingArticles}
            displayTeamLink={displayTeamLink}
            isPreview={isPreview}
            articlesPerPage={isPreview ? 20 : undefined}
          />
        </Box>

        <Box mx={3} flex="2 1 400px">
          <TweetFeed
            tweets={tweets}
            isFetching={fetchingTweets}
            displayTeamLink={displayTeamLink}
            isPreview={isPreview}
            tweetsPerPage={isPreview ? 20 : undefined}
          />

          <YoutubeFeed
            videos={videos}
            isFetching={fetchingVideos}
            displayTeamLink={displayTeamLink}
            isPreview={isPreview}
            videosPerPage={isPreview ? 20 : undefined}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default FeedLayout;
