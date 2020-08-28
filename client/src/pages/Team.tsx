import React, { useState, useEffect } from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Team as TeamInterface } from '../interfaces/team';
import { Box, Flex } from '@chakra-ui/core';
import ArticlesFeed from '../components/feed/ArticlesFeed';
import TweetsFeed from '../components/feed/TweetsFeed';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '../components/Loader';
import useAxios from '../hooks/useAxios';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import { YoutubeVideo } from '../interfaces/youtubeVideo';
import YoutubeFeed from '../components/feed/YoutubeFeed';

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

const Team = (props: RouteComponentProps<MatchParams>) => {
  const slug = props.match.params.slug;
  const [team, setTeam] = useState<TeamInterface | null>(null);
  const [fetchingTeam, setFetchingTeam] = useState(false);

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

  useEffect(() => {
    fetchTeam();
  }, [slug]);

  const fetchTeam = async () => {
    try {
      setFetchingTeam(true);

      const { data } = await axios.get(`/api/teams/slug/${slug}`);

      setTeam(data.payload);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingTeam(false);
    }
  };

  return (
    <Box as="main">
      {/* <Box px={10} py={5} bg="white">
        <Box maxW={CONTENT_WRAPPER_WIDTH} marginX="auto">
          <Heading as="h1" size="md" fontWeight="normal">
            {team?.fullName}
          </Heading>

          <Link href={team?.websiteUrl} color="blue.700" isExternal>
            {team?.websiteUrl}
          </Link>
        </Box>
      </Box> */}

      {fetchingTeam ? (
        <Loader />
      ) : (
        <Flex py={10} flexWrap="wrap" flexDir="row" maxW={CONTENT_WRAPPER_WIDTH} marginX="auto">
          <Box px={5} flex="3" minWidth={400}>
            <ArticlesFeed articles={articles} isFetching={fetchingArticles} />
          </Box>

          <Box px={5} flex="1" minWidth={400}>
            <TweetsFeed tweets={tweets} isFetching={fetchingTweets} />
            <YoutubeFeed videos={videos} isFetching={fetchingVideos} />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Team;
