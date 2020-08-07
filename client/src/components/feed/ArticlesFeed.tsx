import React, { FC, useState, useEffect } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/core';
import { Article as ArticleType } from './../../interfaces/article';
import ReactPaginate from 'react-paginate';
import Article from './Article';
import { calcualteTotalPages } from './../../utils/feed';

type Props = { articles?: ArticleType[]; isFetching: boolean; articlesPerPage?: number };

const ArticlesFeed: FC<Props> = ({ articles = [], isFetching = false, articlesPerPage = 20 }) => {
  const [page, setPage] = useState(0);
  const [visibleArtices, setVisibleArticles] = useState(articles);
  const totalPages = calcualteTotalPages(articles.length, articlesPerPage);

  useEffect(() => {
    const pagedArticles = articles.slice(page * articlesPerPage, (page + 1) * articlesPerPage);
    setVisibleArticles(pagedArticles);
  }, [page, articles, articlesPerPage]);

  return (
    <Box bg="white" p={6} boxShadow="sm">
      <Box as="h1" textTransform="uppercase" mb={2} fontSize="16px">
        Headlines
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Box>

      {isFetching ? (
        <Flex justify="center" w="100%" p={10}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue.900" size="lg" />
        </Flex>
      ) : (
        <>
          {visibleArtices.map((article: ArticleType) => (
            <Article key={article.id} article={article} />
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
