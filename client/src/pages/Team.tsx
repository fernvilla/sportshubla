import React, { useState, useEffect, FC } from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Team as TeamInterface } from '../interfaces/team';
import { Box, Flex } from '@chakra-ui/core';
import ArticlesFeed from '../components/feed/ArticlesFeed';
import SocialFeed from '../components/feed/SocialFeed';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  slug: string;
}

const Team = (props: RouteComponentProps<MatchParams>) => {
  const slug = props.match.params.slug;
  const [team, setTeam] = useState<TeamInterface>();
  const [fetchingTeam, setFetchingTeam] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [fetchingArticles, setFetchingArticles] = useState(false);
  const [fetchingTweets, setFetchingTweets] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, [slug]);

  useEffect(() => {
    if (!team) return;

    fetchArticles(team.id);
    fetchTweets(team.id);
  }, [team]);

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

  const fetchArticles = async (id: number) => {
    try {
      setFetchingArticles(true);

      const { data } = await axios.get(`/api/articles/team/id/${id}`);

      setArticles(data.payload);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingArticles(false);
    }
  };

  const fetchTweets = async (id: number) => {
    try {
      setFetchingTweets(true);

      const { data } = await axios.get(`/api/tweets/team/id/${id}`);

      setTweets(data.payload);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingTweets(false);
    }
  };

  return (
    <Box as="main">
      <Flex px={5} py={10} flexWrap="wrap" flexDir="row">
        <Box px={5} flex="3" minWidth={450}>
          <ArticlesFeed articles={articles} isFetching={fetchingArticles || fetchingTeam} />
        </Box>

        <Box px={5} flex="2" minWidth={350}>
          <SocialFeed tweets={tweets} isFetching={fetchingTweets || fetchingTeam} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Team;
