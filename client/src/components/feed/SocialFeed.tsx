import React, { FC, useState, useEffect } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/core';
import { Tweet as TweetType } from './../../interfaces/tweet';
import Tweet from './Tweet';
import { calcualteTotalPages } from './../../utils/feed';
import ReactPaginate from 'react-paginate';

type Props = { tweets?: TweetType[]; isFetching: Boolean; tweetsPerPage?: number };

const SocialFeed: FC<Props> = ({ tweets = [], isFetching = false, tweetsPerPage = 10 }) => {
  const [page, setPage] = useState(0);
  const [visibleTweets, setVisibleTweets] = useState(tweets);
  const totalPages = calcualteTotalPages(tweets.length, tweetsPerPage);

  useEffect(() => {
    const pagedTweets = tweets.slice(page * tweetsPerPage, (page + 1) * tweetsPerPage);

    setVisibleTweets(pagedTweets);
  }, [page, tweets, tweetsPerPage]);

  return (
    <Box bg="white" p={6} boxShadow="sm">
      <Box as="h1" textTransform="uppercase" mb={2} fontSize="16px">
        Social Feed
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Box>

      {isFetching ? (
        <Flex justify="center" w="100%" p={10}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue.900" size="lg" />
        </Flex>
      ) : (
        <>
          <Box overflow="auto">
            {visibleTweets.map((tweet: TweetType) => (
              <Tweet key={tweet.id} tweet={tweet} />
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
                  onPageChange={({ selected }) => setPage(selected)}
                />
              </Flex>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default SocialFeed;
