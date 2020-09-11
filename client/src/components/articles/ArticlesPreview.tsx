import React from 'react';
import { default as ArticleInterface } from '../../interfaces/article';
import { Box, Flex, PseudoBox, Text } from '@chakra-ui/core';
import { FaRedo, FaRegFrown } from 'react-icons/fa';
import Loader from '../Loader';
import Article from './Article';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';

interface Props {
  articles?: ArticleInterface[];
  isFetching: boolean;
}

const ArticlesPreview = ({ articles = [], isFetching = false }: Props) => {
  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm">
      <SectionHeader title="Latest Articles" />

      {isFetching ? (
        <Loader />
      ) : (
        <>
          {articles.map((article, i) => (
            <Article
              key={article.id}
              article={article}
              displayTeamLink
              noBorder={i === articles.length - 1}
            />
          ))}

          {!!articles.length ? (
            <Box marginBottom={-6}>
              <Flex justifyContent="flex-end" pb={3}>
                <Link to="/articles">
                  <Flex color="blue.700" p={1} alignItems="center">
                    <Text>View all</Text>
                  </Flex>
                </Link>
              </Flex>
            </Box>
          ) : (
            <Flex justifyContent="center" padding={5}>
              <Box textAlign="center">
                <Flex justifyContent="center" fontSize="2xl">
                  <FaRegFrown />
                </Flex>
                No Articles Available
              </Box>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default ArticlesPreview;
