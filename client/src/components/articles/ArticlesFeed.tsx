import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Heading, PseudoBox } from '@chakra-ui/core';
import { default as ArticleInterface } from './../../interfaces/article';
import ReactPaginate from 'react-paginate';
import Article from './Article';
import { calculateTotalPages } from './../../utils/feed';
import Loader from '../Loader';
import { FaRedo, FaRegFrown } from 'react-icons/fa';

type Props = {
  articles: ArticleInterface[];
  isFetching: boolean;
  articlesPerPage?: number;
  displayTeamLink?: boolean;
  refetchData?: () => void;
};

const ArticlesFeed = ({
  articles = [],
  isFetching = false,
  articlesPerPage = 20,
  displayTeamLink = false,
  refetchData
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
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
          Articles
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
          {visibleArtices.map((article: ArticleInterface) => (
            <Article key={article.id} article={article} displayTeamLink={displayTeamLink} />
          ))}

          {!!articles.length ? (
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

export default ArticlesFeed;
