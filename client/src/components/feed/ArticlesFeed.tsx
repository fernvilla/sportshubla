import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { Article as ArticleType } from './../../interfaces/article';
import ReactPaginate from 'react-paginate';
import Article from './Article';
import { calcualteTotalPages } from './../../utils/feed';
import { scrollTo } from '../../utils/window';
import Loader from '../Loader';

type Props = {
  articles: ArticleType[];
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
  const [visibleArtices, setVisibleArticles] = useState<ArticleType[]>(articles);
  const totalPages = calcualteTotalPages(articles.length, articlesPerPage);

  useEffect(() => {
    if (!articles || !articles.length) return setVisibleArticles([]);

    const pagedArticles = articles.slice(page * articlesPerPage, (page + 1) * articlesPerPage);

    setVisibleArticles(pagedArticles);
  }, [page, articles, articlesPerPage]);

  const onPageChange = ({ selected }: { selected: number }) => {
    scrollTo(0, () => setPage(selected));
  };

  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm">
      <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
        Headlines
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Heading>

      {isFetching ? (
        <Loader />
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
