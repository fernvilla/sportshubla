import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { Article as ArticleInterface } from './../../interfaces/article';
import ReactPaginate from 'react-paginate';
import Article from './Article';
import { calculateTotalPages } from './../../utils/feed';
import Loader from '../Loader';

type Props = {
  articles: ArticleInterface[];
  isFetching: boolean;
  articlesPerPage?: number;
  displayTeamLink?: boolean;
};

const ArticlesFeed = ({
  articles = [],
  isFetching = false,
  articlesPerPage = 20,
  displayTeamLink = false
}: Props) => {
  const [page, setPage] = useState(0);
  const [visibleArtices, setVisibleArticles] = useState<ArticleInterface[]>(articles);
  const totalPages = calculateTotalPages(articles.length, articlesPerPage);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!articles || !articles.length) return setVisibleArticles([]);

    const pagedArticles = articles.slice(page * articlesPerPage, (page + 1) * articlesPerPage);

    setVisibleArticles(pagedArticles);
  }, [page, articles, articlesPerPage]);

  const onPageChange = ({ selected }: { selected: number }) => {
    scrollTo();
    setTimeout(() => setPage(selected), 500);
  };

  const scrollTo = () => {
    if (window.pageXOffset > 0) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm" ref={ref}>
      <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
        Headlines
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Heading>

      {isFetching ? (
        <Loader />
      ) : (
        <>
          {visibleArtices.map((article: ArticleInterface) => (
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
                  onPageChange={onPageChange}
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
