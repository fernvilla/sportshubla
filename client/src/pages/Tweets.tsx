import React, { useEffect, useRef, useState } from 'react';
import { TweetData } from '../interfaces/tweet';
import useAxios from '../hooks/useAxios';
import { Box, Flex, Grid } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import Tweet from '../components/tweets/Tweet';
import { calculateTotalPages } from '../utils/feed';
import { default as TweetInterface } from './../interfaces/tweet';
import ReactPaginate from 'react-paginate';
import { scrollToCallback } from '../utils/window';
import Loader from '../components/Loader';

const Tweets = () => {
  const { response: tweets = [], isLoading }: TweetData = useAxios({
    url: '/api/tweets'
  });

  const [page, setPage] = useState(0);
  const [visibleTweets, setVisibleTweets] = useState<TweetInterface[]>(tweets);
  const tweetsPerPage = 36;
  const totalPages = calculateTotalPages(tweets.length, tweetsPerPage);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tweets || !tweets.length) return setVisibleTweets([]);

    const pagedTweets = tweets.slice(page * tweetsPerPage, (page + 1) * tweetsPerPage);

    setVisibleTweets(pagedTweets);
  }, [page, tweets, tweetsPerPage]);

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
