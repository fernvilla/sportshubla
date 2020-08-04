import React, { FC, useState, useEffect } from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Box, Grid } from '@chakra-ui/core';
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

      const res = await fetch('/api/articles'); //TODO: limit to last 24 hrs?
      const data = await res.json();

      setArticles(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingArticles(false);
    }
  };

  const fetchTweets = async () => {
    try {
      setFetchingTweets(true);

      const res = await fetch('/api/tweets'); //TODO: limit to last 24 hrs?
      const data = await res.json();

      setTweets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setFetchingTweets(false);
    }
  };

  return (
    <Box maxWidth={1600} margin="auto">
      <Grid p={10} templateColumns="4fr 2fr">
        <Box as="main" px={10} borderRightWidth="1px">
          <ArticlesFeed articles={articles} isFetching={fetchingArticles} />
        </Box>

        <Box px={10}>
          <SocialFeed tweets={tweets} isFetching={fetchingTweets} />
        </Box>
      </Grid>
    </Box>
  );
};

export default Home;
