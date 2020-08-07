import React, { FC, useState, useEffect } from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Box, Flex } from '@chakra-ui/core';
import ArticlesFeed from '../components/feed/ArticlesFeed';
import SocialFeed from '../components/feed/SocialFeed';

const Home: FC = () => {
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

      const res = await fetch('/api/articles/lastday');
      const { payload } = await res.json();

      setArticles(payload);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingArticles(false);
    }
  };

  const fetchTweets = async () => {
    try {
      setFetchingTweets(true);

      const res = await fetch('/api/tweets/lastday');
      const { payload } = await res.json();

      setTweets(payload);
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
          <ArticlesFeed articles={articles} isFetching={fetchingArticles} />
        </Box>

        <Box px={5} flex="2" minWidth={350}>
          <SocialFeed tweets={tweets} isFetching={fetchingTweets} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
