import React, { useState, FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import store from 'store';
import setAuthToken from './utils/auth';
import { setCurrentUser, logoutUser } from './actions/authActions';
import reduxStore from './store';
import { Box, Grid } from '@chakra-ui/core';
import ArticlesFeed from './components/feed/ArticlesFeed';
import SocialFeed from './components/feed/SocialFeed';

import 'react-toastify/dist/ReactToastify.css';
import SiteLayout from './components/layout/SiteLayout';
import { Token } from './interfaces/token';

toast.configure();

const jwtToken = store.get('jwtToken');

if (jwtToken) {
  setAuthToken(jwtToken);

  const decoded = jwt_decode<Token>(jwtToken);
  console.log(decoded);

  reduxStore.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    reduxStore.dispatch(logoutUser());
    window.location.href = '/';
  }
}

const App: FC = () => {
  const [articles, setArticles] = useState([]);
  const [tweets, setTweets] = useState([]);
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
    <SiteLayout>
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
    </SiteLayout>
  );
};

export default App;
