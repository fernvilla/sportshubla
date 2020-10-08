import React, { useContext, useEffect, useRef, useState } from 'react';
import { TweetData } from '../interfaces/tweet';
import useAxios from '../hooks/useAxios';
import { Box, Flex, Grid, Text } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import Tweet from '../components/tweets/Tweet';
import { calculateTotalPages } from '../utils/feed';
import { default as TweetInterface } from './../interfaces/tweet';
import ReactPaginate from 'react-paginate';
import { scrollToCallback } from '../utils/window';
import Loader from '../components/Loader';
import TeamContext from '../contexts/TeamContext';
import Select, { OptionTypeBase, ValueType } from 'react-select';

const Tweets = () => {
  const { response: tweets = [], isLoading }: TweetData = useAxios({ url: '/api/tweets' });

  const { teams } = useContext(TeamContext);
  const teamOptions = teams.map(team => ({ label: team.shortName, value: team.id }));
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTeams, setSelectedTeams] = useState<ValueType<OptionTypeBase>>([]);
  const [visibleTweets, setVisibleTweets] = useState<TweetInterface[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweetsPerPage = 36;
    const filteredTweets = selectedTeams?.length
      ? tweets.filter(tweet => selectedTeams.includes(tweet.twitterAccount?.team?.id))
      : tweets;
    const pagedTweets = filteredTweets.slice(page * tweetsPerPage, (page + 1) * tweetsPerPage);

    setVisibleTweets(pagedTweets);
    setTotalPages(calculateTotalPages(filteredTweets.length, tweetsPerPage));
  }, [page, tweets, selectedTeams]);

  const onPageChange = ({ selected }: { selected: number }) => {
    const offset = ref.current ? ref.current.offsetTop : 0;

    scrollToCallback(offset - 100, () => setPage(selected));
  };

  const onSelectTeams = (values: ValueType<OptionTypeBase>) => {
    setSelectedTeams(values?.map((val: { value: number; label: string }) => val.value) || []);
  };

  return (
    <Box px={3} py={5} mt={3} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto" ref={ref}>
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

          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" columnGap={4}>
            {visibleTweets.map(tweet => (
              <Tweet tweet={tweet} key={tweet.id} />
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

export default Tweets;
