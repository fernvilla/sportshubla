import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import { Tweet as TweetInterface } from './../../interfaces/tweet';
import Tweet from './Tweet';
import { calculateTotalPages } from './../../utils/feed';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';

type Props = {
  tweets?: TweetInterface[];
  isFetching: Boolean;
  tweetsPerPage?: number;
  displayTeamLink?: boolean;
};

const TweetsFeed = ({
  tweets = [],
  isFetching = false,
  tweetsPerPage = 10,
  displayTeamLink = false
}: Props) => {
  const [page, setPage] = useState(0);
  const [visibleTweets, setVisibleTweets] = useState(tweets);
  const totalPages = calculateTotalPages(tweets.length, tweetsPerPage);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tweets || !tweets.length) return setVisibleTweets([]);

    const pagedTweets = tweets.slice(page * tweetsPerPage, (page + 1) * tweetsPerPage);

    setVisibleTweets(pagedTweets);
  }, [page, tweets, tweetsPerPage]);

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
        Tweets
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Heading>

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Box overflow="auto">
            {visibleTweets.map((tweet: TweetInterface) => (
              <Tweet key={tweet.id} tweet={tweet} displayTeamLink={displayTeamLink} />
            ))}
          </Box>

          {!!tweets.length && (
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

export default TweetsFeed;
