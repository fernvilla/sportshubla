import React, { FC, useState, useEffect } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/core';
import { Article as ArticleType } from 'src/interfaces/article';
import ReactPaginate from 'react-paginate';
import Article from './Article';
import { calcualteTotalPages } from 'src/utils';

type Props = { articles?: ArticleType[]; isFetching: boolean; articlesPerPage?: number };

const ArticlesFeed: FC<Props> = ({ articles = [], isFetching = false, articlesPerPage = 10 }) => {
  const [page, setPage] = useState(0);
  const [visibleArtices, setVisibleArticles] = useState(articles);
  const totalPages = calcualteTotalPages(articles.length, 10);

  useEffect(() => {
    const pagedArticles = articles.slice(page * articlesPerPage, (page + 1) * articlesPerPage);
    setVisibleArticles(pagedArticles);
  }, [page, articles]);

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
          {visibleArtices.map((article: ArticleType) => (
            <Article key={article.id} article={article} />
          ))}

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
        </>
      )}
    </>
  );
};

export default ArticlesFeed;
