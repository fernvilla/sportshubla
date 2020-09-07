import React from 'react';
import ArticlesFeed from '../components/articles/ArticlesFeed';
import { ArticleData } from '../interfaces/article';
import useAxios from '../hooks/useAxios';
import { Box } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';

const Articles = () => {
  const { response, isLoading, refetch }: ArticleData = useAxios({
    url: '/api/articles'
  });

  return (
    <Box px={3} py={5} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto">
      <ArticlesFeed
        articles={response}
        isFetching={isLoading}
        refetchData={refetch}
        displayTeamLink
      />
    </Box>
  );
};

export default Articles;
