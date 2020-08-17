import React, { useState } from 'react';
import { Article } from '../interfaces/article';
import { Tweet } from '../interfaces/tweet';
import { Box, Flex, Heading, Button, Icon } from '@chakra-ui/core';
import ArticlesFeed from '../components/feed/ArticlesFeed';
import SocialFeed from '../components/feed/SocialFeed';
import store from 'store';
import useAxios from '../hooks/useAxios';

const Home = () => {
  const heroLocalStorage = store.get('showHomeHero');
  const showHeroDefault = typeof heroLocalStorage === 'undefined' ? true : heroLocalStorage;
  const [showHero, setShowHero] = useState(showHeroDefault);

  const {
    response: articles,
    isLoading: fetchingArticles
  }: { response: Article[]; isLoading: boolean } = useAxios({ url: '/api/articles/lastday' });

  const {
    response: tweets,
    isLoading: fetchingTweets
  }: { response: Tweet[]; isLoading: boolean } = useAxios({ url: '/api/tweets/lastday' });

  return (
    <Box as="main">
      {showHero && (
        <Box
          backgroundImage="url(/images/fans_alt.jpg)"
          backgroundPosition="center"
          backgroundSize="cover"
          pos="relative"
        >
          <Icon
            name="close"
            color="#fff"
            position="absolute"
            top={5}
            right={5}
            textShadow="sm"
            cursor="pointer"
            onClick={() => {
              setShowHero(false);
              store.set('showHomeHero', false);
            }}
          />

          <Flex
            bg="rgb(0 22 41 / 65%)"
            height="100%"
            width="100%"
            p="4em 2em"
            align="center"
            justifyContent="center"
          >
            <Box textAlign="center">
              {/* <Image
                src="/images/logo/logo-transparent-solo.png"
                alt="logo"
                title="logo"
                ignoreFallback
                width="50px"
                margin="auto"
              /> */}

              <Heading mt={2} fontSize="3xl" color="gray.100" textShadow="sm">
                Stay up to date with all the latest{' '}
                <Box as="span" color="blue.400" textShadow="sm">
                  L.A. sports news
                </Box>
                .
              </Heading>

              <Button variantColor="blue" bg="blue.400" mt={5} boxShadow="sm" size="sm">
                Set My Teams
              </Button>
            </Box>
          </Flex>
        </Box>
      )}

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
