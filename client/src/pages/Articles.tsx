import React, { useEffect, useRef, useState } from 'react';
import { ArticleData } from '../interfaces/article';
import useAxios from '../hooks/useAxios';
import { Box, Flex, Grid } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import Article from '../components/articles/Article';
import { calculateTotalPages } from '../utils/feed';
import { default as ArticleInterface } from './../interfaces/article';
import ReactPaginate from 'react-paginate';
import { scrollToCallback } from '../utils/window';
import Loader from '../components/Loader';

const Articles = () => {
  const { response: articles = [], isLoading }: ArticleData = useAxios({
    url: '/api/articles'
  });

  const [page, setPage] = useState(0);
  const [visibleArticles, setVisibleArticles] = useState<ArticleInterface[]>(articles);
  const articlesPerPage = 30;
  const totalPages = calculateTotalPages(articles.length, articlesPerPage);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!articles || !articles.length) return setVisibleArticles([]);

    const pagedArticles = articles.slice(page * articlesPerPage, (page + 1) * articlesPerPage);

    setVisibleArticles(pagedArticles);
  }, [page, articles, articlesPerPage]);

  const onPageChange = ({ selected }: { selected: number }) => {
    const offset = ref.current ? ref.current.offsetTop : 0;

    scrollToCallback(offset - 100, () => setPage(selected));
  };

  return (
    <Box px={3} py={5} mt={3} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto" ref={ref}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid templateColumns="repeat(auto-fit, minmax(400px, 1fr))" columnGap={4}>
            {visibleArticles.map(article => (
              <Article article={article} key={article.id} />
            ))}
          </Grid>

          <Flex justifyContent="flex-end">
            <ReactPaginate
              containerClassName="pagination"
              pageCount={totalPages}
              pageRangeDisplayed={1}
              marginPagesDisplayed={1}
              forcePage={page}
              onPageChange={onPageChange}
            />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Articles;
