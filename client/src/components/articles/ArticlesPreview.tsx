import React from 'react';
import { default as ArticleInterface } from '../../interfaces/article';
import { Box, Flex, Heading, PseudoBox, Text } from '@chakra-ui/core';
import { FaRedo, FaRegFrown, FaAngleDoubleRight } from 'react-icons/fa';
import Loader from '../Loader';
import Article from './Article';
import { Link } from 'react-router-dom';

interface Props {
  articles?: ArticleInterface[];
  isFetching: boolean;
  refetchData?: () => void;
}

const ArticlesPreview = ({ refetchData, articles = [], isFetching = false }: Props) => {
  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
          Latest Articles
          <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
        </Heading>

        {refetchData && (
          <PseudoBox
            _hover={{ color: 'blue.500' }}
            transition="color 0.5s ease"
            cursor="pointer"
            onClick={refetchData}
            color="blue.700"
            title="Refresh"
          >
            <FaRedo />
          </PseudoBox>
        )}
      </Flex>

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
