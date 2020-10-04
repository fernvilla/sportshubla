import React, { useContext, useEffect, useRef, useState } from 'react';
import { ArticleData } from '../interfaces/article';
import useAxios from '../hooks/useAxios';
import { Box, Flex, Grid, Text } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import Article from '../components/articles/Article';
import { calculateTotalPages } from '../utils/feed';
import { default as ArticleInterface } from './../interfaces/article';
import ReactPaginate from 'react-paginate';
import { scrollToCallback } from '../utils/window';
import Loader from '../components/Loader';
import TeamContext from '../contexts/TeamContext';
import Select, { OptionTypeBase, ValueType } from 'react-select';

const Articles = () => {
  const { response: articles = [], isLoading }: ArticleData = useAxios({ url: '/api/articles' });

  const { teams } = useContext(TeamContext);
  const teamOptions = teams.map(team => ({ label: team.shortName, value: team.id }));
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTeams, setSelectedTeams] = useState<ValueType<OptionTypeBase>>([]);
  const [visibleArticles, setVisibleArticles] = useState<ArticleInterface[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const articlesPerPage = 30;
    const filteredArticles = selectedTeams?.length
      ? articles.filter(article => selectedTeams.includes(article.newsFeed.team?.id))
      : articles;
    const pagedArticles = filteredArticles.slice(
      page * articlesPerPage,
      (page + 1) * articlesPerPage
    );

    setVisibleArticles(pagedArticles);
    setTotalPages(calculateTotalPages(filteredArticles.length, articlesPerPage));
  }, [page, articles, selectedTeams]);

  const onPageChange = ({ selected }: { selected: number }) => {
    const offset = ref.current ? ref.current.offsetTop : 0;

    scrollToCallback(offset - 100, () => setPage(selected));
  };

  const onSelectTeams = (values: ValueType<OptionTypeBase>) => {
    setSelectedTeams(values?.map((val: { value: number; label: string }) => val.value) || []);
  };

  return (
    <Box px={3} py={5} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto" ref={ref}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Flex mb={4} justifyContent="flex-end" alignItems="center">
            <Text pr={2}>Filter By:</Text>

            <Box minW="250px" maxW="500px">
              <Select
                isMulti
                name="teams"
                options={teamOptions}
                placeholder="Select teams"
                onChange={onSelectTeams}
                styles={{
                  menu: base => ({ ...base, zIndex: 1000 }),
                  clearIndicator: base => ({
                    ...base,
                    ':hover': { cursor: 'pointer' }
                  }),
                  multiValueLabel: base => ({
                    ...base,
                    color: '#007bff',
                    backgroundColor: '#e7f4ff'
                  }),
                  multiValueRemove: base => ({
                    ...base,
                    color: '#007bff',
                    backgroundColor: '#e7f4ff',
                    ':hover': {
                      backgroundColor: '#007bff',
                      color: '#e7f4ff',
                      cursor: 'pointer'
                    }
                  })
                }}
              />
            </Box>
          </Flex>

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
