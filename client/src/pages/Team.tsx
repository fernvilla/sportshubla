import React, { useState, useEffect } from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Team as TeamInterface } from '../interfaces/team';
import { Box, Flex, Heading, Link } from '@chakra-ui/core';
import ArticlesFeed from '../components/feed/ArticlesFeed';
import SocialFeed from '../components/feed/SocialFeed';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '../components/Loader';
import useAxios from '../hooks/useAxios';

interface MatchParams {
  slug: string;
}

const Team = (props: RouteComponentProps<MatchParams>) => {
  const slug = props.match.params.slug;
  const [team, setTeam] = useState<TeamInterface | null>(null);
  const [fetchingTeam, setFetchingTeam] = useState(false);

  const {
    response: tweets,
    isLoading: fetchingTweets
  }: { response: Tweet[]; isLoading: boolean } = useAxios({
    url: `/api/tweets/team/id/${team?.id}`,
    dependency: team?.id,
    trigger: !!team?.id
  });

  const {
    response: articles,
    isLoading: fetchingArticles
  }: { response: Article[]; isLoading: boolean } = useAxios({
    url: `/api/articles/team/id/${team?.id}`,
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
      <Box px={10} py={5} bg="white">
        <Heading as="h1" size="md" fontWeight="normal">
          {team?.fullName}
        </Heading>

        <Link href={team?.websiteUrl} color="blue.700" isExternal>
          {team?.websiteUrl}
        </Link>
      </Box>

      {fetchingTeam ? (
        <Loader />
      ) : (
        <Flex px={5} py={10} flexWrap="wrap" flexDir="row">
          <Box px={5} flex="3" minWidth={400}>
            <ArticlesFeed articles={articles} isFetching={fetchingArticles} />
          </Box>

          <Box px={5} flex="2" minWidth={400}>
            <SocialFeed tweets={tweets} isFetching={fetchingTweets} />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Team;
