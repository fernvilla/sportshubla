import React, { useState } from 'react';
import { TweetData } from '../interfaces/tweet';
import useAxios from '../hooks/useAxios';
import { YoutubeVideoData } from '../interfaces/youtubeVideo';
import { ArticleData } from '../interfaces/article';
import FeedLayout from '../components/feed/FeedLayout';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import { Team } from '../interfaces/team';
import { Box, Tab, TabList, Tabs, Tag, TagLabel } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';

type Props = {
  favoriteTeams: Team[];
};

const Home = (props: Props) => {
  const { favoriteTeams = [] } = props;
  const [filterByFavorites, setFilterByFavorites] = useState(!!favoriteTeams.length);

  const { response: articles, isLoading: fetchingArticles }: ArticleData = useAxios({
    url: filterByFavorites ? '/api/articles/latest/favorites' : '/api/articles/latest',
    method: filterByFavorites ? 'POST' : 'GET',
    data: filterByFavorites ? { ids: favoriteTeams.map((team: Team) => team.id) } : null,
    dependencies: [filterByFavorites, favoriteTeams]
  });

  const { response: tweets, isLoading: fetchingTweets }: TweetData = useAxios({
    url: filterByFavorites ? '/api/tweets/latest/favorites' : '/api/tweets/latest',
    method: filterByFavorites ? 'POST' : 'GET',
    data: filterByFavorites ? { ids: favoriteTeams.map((team: Team) => team.id) } : null,
    dependencies: [filterByFavorites, favoriteTeams]
  });

  const { response: videos, isLoading: fetchingVideos }: YoutubeVideoData = useAxios({
    url: filterByFavorites ? '/api/youtubevideos/latest/favorites' : '/api/youtubevideos/latest',
    method: filterByFavorites ? 'POST' : 'GET',
    data: filterByFavorites ? { ids: favoriteTeams.map((team: Team) => team.id) } : null,
    dependencies: [filterByFavorites, favoriteTeams]
  });

  return (
    <>
      <Box as="main" maxW={CONTENT_WRAPPER_WIDTH} mx="auto" pt={3} pb={1} px={4}>
        <Tabs
          onChange={i => setFilterByFavorites(i === 0)}
          defaultIndex={filterByFavorites ? 0 : 1}
        >
          <TabList>
            <Tab>
              My Teams{' '}
              <Tag size="sm" rounded="full" variant="solid" variantColor="blue" ml={2}>
                <TagLabel>{favoriteTeams.length}</TagLabel>
              </Tag>
            </Tab>
            <Tab>All Teams</Tab>
          </TabList>
        </Tabs>
      </Box>

      <FeedLayout
        articles={articles}
        fetchingArticles={fetchingArticles}
        tweets={tweets}
        fetchingTweets={fetchingTweets}
        videos={videos}
        fetchingVideos={fetchingVideos}
        isPreview
        displayTeamLink
      />
    </>
  );
};

const mapState = (state: RootState) => ({
  favoriteTeams: state.favorites.teams
});

const connector = connect(mapState, null);

export default connector(Home);
