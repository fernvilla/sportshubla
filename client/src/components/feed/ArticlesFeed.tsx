import React, { FC, useState, useEffect } from 'react';
import { Box, Flex, Spinner, Heading } from '@chakra-ui/core';
import { Article as ArticleType } from './../../interfaces/article';
import ReactPaginate from 'react-paginate';
import Article from './Article';
import { calcualteTotalPages } from './../../utils/feed';

type Props = {
  articles: ArticleType[];
  isFetching: boolean;
  articlesPerPage?: number;
  displayTeamLink?: boolean;
};

const ArticlesFeed: FC<Props> = ({
  articles = [],
  isFetching = false,
  articlesPerPage = 20,
  displayTeamLink = false
}) => {
  const [page, setPage] = useState(0);
  const [visibleArtices, setVisibleArticles] = useState(articles);
  const totalPages = calcualteTotalPages(articles.length, articlesPerPage);

  useEffect(() => {
    const pagedArticles = articles.slice(page * articlesPerPage, (page + 1) * articlesPerPage);
    setVisibleArticles(pagedArticles);
  }, [page, articles, articlesPerPage]);

  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm">
      <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
        Headlines
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Heading>

      {isFetching ? (
        <Flex justify="center" w="100%" p={10}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue.900" size="lg" />
        </Flex>
      ) : (
        <>
          {visibleArtices.map((article: ArticleType) => (
            <Article key={article.id} article={article} displayTeamLink={displayTeamLink} />
          ))}

          {!!articles.length && (
            <Box marginBottom={-6}>
              <Flex justifyContent="flex-end">
                <ReactPaginate
                  containerClassName="pagination"
                  pageCount={totalPages}
                  pageRangeDisplayed={1}
                  marginPagesDisplayed={1}
                  forcePage={page}
                  onPageChange={({ selected }) => setPage(selected)}
                />
              </Flex>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ArticlesFeed;
