import { Box, Flex, Text } from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import Loader from '../Loader';
import SectionHeader from '../SectionHeader';
import { default as ArticleInterface } from './../../interfaces/article';
import Article from './Article';
import { Link } from 'react-router-dom';
import { FaRegFrown } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { calculateTotalPages } from '../../utils/feed';
import { scrollToCallback } from '../../utils/window';
import Card from '../Card';

interface Props {
  articles: ArticleInterface[];
  isFetching?: boolean;
  displayTeamLink?: boolean;
  isPreview?: boolean;
  articlesPerPage?: number;
}

const ArticleFeed = ({
  articles = [],
  isFetching = false,
  displayTeamLink = false,
  isPreview = false,
  articlesPerPage = 20
}: Props) => {
  const [page, setPage] = useState(0);
  const [visibleArticles, setVisibleArticles] = useState<ArticleInterface[]>(articles);
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
    <Box ref={ref}>
      <SectionHeader title={isPreview ? 'Latest Articles' : 'Articles'} />

      {isFetching ? (
        <Loader />
      ) : (
        <>
          {visibleArticles.map(article => (
            <Article article={article} key={article.id} displayTeamLink={displayTeamLink} />
          ))}

          {!!articles.length ? (
            <Box>
              <Flex justifyContent="flex-end">
                {isPreview ? (
                  <Link to="/articles">
                    <Flex color="blue.700" p={1} alignItems="center">
                      <Text>View all articles</Text>
                    </Flex>
                  </Link>
                ) : (
                  <ReactPaginate
                    containerClassName="pagination"
                    pageCount={totalPages}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    forcePage={page}
                    onPageChange={onPageChange}
                  />
                )}
              </Flex>
            </Box>
          ) : (
            <Card mb={4}>
              <Flex justifyContent="center" padding={5}>
                <Box textAlign="center">
                  <Flex justifyContent="center" fontSize="2xl">
                    <FaRegFrown />
                  </Flex>
                  No Articles Available
                </Box>
              </Flex>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default ArticleFeed;
