import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Article from '../interfaces/article';
import Tweet from '../interfaces/tweet';
import YoutubeVideo from '../interfaces/youtubeVideo';
import useAxios from '../hooks/useAxios';
import { isEmpty } from '../utils/validation';
import FeedLayout from '../components/feed/FeedLayout';
import Loader from '../components/Loader';
import { Box, Heading, Text } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';

type Props = RouteComponentProps & {
  location: Location;
};

interface SearchData {
  response: {
    articles: Article[];
    tweets: Tweet[];
    videos: YoutubeVideo[];
  };
  isLoading: boolean;
}

const Search = ({ location }: Props) => {
  const query = new URLSearchParams(location.search).get('q');

  const { response: results, isLoading: searching }: SearchData = useAxios({
    method: 'POST',
    url: '/api/search',
    data: { query },
    trigger: !isEmpty(query),
    dependencies: [query]
  });

  const { articles, tweets, videos } = results || {};

  return (
    <Box as="main">
      <Box px={3} pt={5} maxW={CONTENT_WRAPPER_WIDTH} marginX="auto">
        <Box p={5} bg="white" boxShadow="sm">
          <Heading as="h1" size="md" fontWeight="normal">
            Search results for:{' '}
            <Text as="span" color="brand-secondary">
              {query}
            </Text>
          </Heading>
        </Box>
      </Box>

      {searching ? (
        <Loader />
      ) : (
        <FeedLayout articles={articles} tweets={tweets} videos={videos} displayTeamLink />
      )}
    </Box>
  );
};

export default withRouter(Search);
