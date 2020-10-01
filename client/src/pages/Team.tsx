import React from 'react';

import { TeamData } from '../interfaces/team';
import { Box, Heading, Link } from '@chakra-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '../components/Loader';
import useAxios from '../hooks/useAxios';
import { YoutubeVideoData } from '../interfaces/youtubeVideo';
import FeedLayout from '../components/FeedLayout';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import { TweetData } from '../interfaces/tweet';
import { ArticleData } from '../interfaces/article';

interface MatchParams {
  slug: string;
}

const Team = (props: RouteComponentProps<MatchParams>) => {
  const slug = props.match.params.slug;

  const { response: team, isLoading: fetchingTeam }: TeamData = useAxios({
    url: `/api/teams/slug/${slug}`,
    dependency: slug,
    trigger: !!slug
  });

  const { response: tweets, isLoading: fetchingTweets }: TweetData = useAxios({
    url: `/api/tweets/team/id/${team?.id}`,
    dependency: team?.id,
    trigger: !!team?.id
  });

  const { response: articles, isLoading: fetchingArticles }: ArticleData = useAxios({
    url: `/api/articles/team/id/${team?.id}`,
    dependency: team?.id,
    trigger: !!team?.id
  });

  const { response: videos, isLoading: fetchingVideos }: YoutubeVideoData = useAxios({
    url: `/api/youtubevideos/team/id/${team?.id}`,
    dependency: team?.id,
    trigger: !!team?.id
  });

  return (
    <Box as="main">
      <Box px={3} pt={5} maxW={CONTENT_WRAPPER_WIDTH} marginX="auto">
        <Box p={5} bg="white" boxShadow="sm">
          <Heading as="h1" size="md" fontWeight="normal">
            {team?.name}
          </Heading>

          <Link href={team?.websiteUrl} color="blue.700" isExternal>
            {team?.websiteUrl}
          </Link>
        </Box>
      </Box>

      {fetchingTeam ? (
        <Loader />
      ) : (
        <FeedLayout
          articles={articles}
          fetchingArticles={fetchingArticles}
          tweets={tweets}
          fetchingTweets={fetchingTweets}
          videos={videos}
          fetchingVideos={fetchingVideos}
        />
      )}
    </Box>
  );
};

export default Team;
