import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import ArticlesFeed from './ArticlesFeed';
import TweetsFeed from './TweetsFeed';
import YoutubeFeed from './YoutubeFeed';
import { Article } from '../../interfaces/article';
import { Tweet } from '../../interfaces/tweet';
import { YoutubeVideo } from '../../interfaces/youtubeVideo';
import { CONTENT_WRAPPER_WIDTH } from '../../globals/constants';

interface Props {
  articles: Article[];
  fetchingArticles: boolean;
  tweets: Tweet[];
  fetchingTweets: boolean;
  videos: YoutubeVideo[];
  fetchingVideos: boolean;
  displayTeamLink?: boolean;
}

const FeedLayout = ({
  articles,
  fetchingArticles,
  tweets,
  fetchingTweets,
  videos,
  fetchingVideos,
  displayTeamLink
}: Props) => {
  return (
    <Box maxW={CONTENT_WRAPPER_WIDTH} mx="auto">
      <Box px={3} pt={5}>
        <YoutubeFeed videos={videos} isFetching={fetchingVideos} />
      </Box>

      <Flex pt={5} flexWrap="wrap" flexDir="row">
        <Box px={3} flex="5" minWidth={400}>
          <ArticlesFeed
            articles={articles}
            isFetching={fetchingArticles}
            displayTeamLink={displayTeamLink}
          />
        </Box>

        <Box px={3} flex="3" minWidth={400}>
          <TweetsFeed
            tweets={tweets}
            isFetching={fetchingTweets}
            displayTeamLink={displayTeamLink}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default FeedLayout;
