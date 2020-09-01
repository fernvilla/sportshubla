import React from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Team as TeamInterface } from '../interfaces/team';
import { Box, Heading, Link } from '@chakra-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '../components/Loader';
import useAxios from '../hooks/useAxios';
import { YoutubeVideo } from '../interfaces/youtubeVideo';
import FeedLayout from '../components/feed/FeedLayout';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';

interface MatchParams {
  slug: string;
}

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

interface TeamData {
  response: TeamInterface;
  isLoading: boolean;
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

  const { response: videos, isLoading: fetchingVideos }: VideoData = useAxios({
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
