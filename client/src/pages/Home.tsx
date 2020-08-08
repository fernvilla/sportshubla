import React, { useState, useEffect } from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Box, Flex } from '@chakra-ui/core';
import ArticlesFeed from '../components/feed/ArticlesFeed';
import SocialFeed from '../components/feed/SocialFeed';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [fetchingArticles, setFetchingArticles] = useState(false);
  const [fetchingTweets, setFetchingTweets] = useState(false);

  useEffect(() => {
    fetchArticles();
    fetchTweets();
  }, []);

  const fetchArticles = async () => {
    try {
      setFetchingArticles(true);

      const { data } = await axios.get('/api/articles/lastday');

      setArticles(data.payload);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingArticles(false);
    }
  };

  const fetchTweets = async () => {
    try {
      setFetchingTweets(true);

      const { data } = await axios.get('/api/tweets/lastday');

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
        <Box px={5} flex="3" minWidth={400}>
          <ArticlesFeed articles={articles} isFetching={fetchingArticles} displayTeamLink />
        </Box>

        <Box px={5} flex="2" minWidth={400}>
          <SocialFeed tweets={tweets} isFetching={fetchingTweets} displayTeamLink />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
