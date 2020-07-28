import React, { FC } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/core';
import { Article as ArticleType } from 'src/interfaces/article';
import Article from './Article';

type Props = { articles?: ArticleType[]; isFetching: Boolean };

const ArticlesFeed: FC<Props> = ({ articles = [], isFetching = false }) => {
  const calcualteTotalPages = (dataLength: number, rowsPerPage: number) => {
    return Math.ceil(dataLength / rowsPerPage);
  };

  return (
    <>
      <Box fontWeight="medium" textTransform="uppercase" mb={2}>
        Latest News
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.500"></Box>
      </Box>

      {isFetching ? (
        <Flex justify="center" w="100%" p={10}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue.900" size="lg" />
        </Flex>
      ) : (
        <>
          {articles.map(article => (
            <Article key={article.id} article={article} />
          ))}
        </>
      )}
    </>
  );
};

export default ArticlesFeed;
