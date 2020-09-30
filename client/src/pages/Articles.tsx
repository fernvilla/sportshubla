import React from 'react';
import { ArticleData } from '../interfaces/article';
import useAxios from '../hooks/useAxios';
import { Box } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import ArticleFeed from '../components/articles/ArticleFeed';

const Articles = () => {
  const { response, isLoading }: ArticleData = useAxios({
    url: '/api/articles'
  });

  return (
    <Box px={3} py={5} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto">
      <ArticleFeed articles={response} isFetching={isLoading} displayTeamLink />
    </Box>
  );
};

export default Articles;
