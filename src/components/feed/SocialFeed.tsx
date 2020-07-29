import React, { FC, useState, useEffect } from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/core';
import { Tweet as TweetType } from 'src/interfaces/tweet';
import Tweet from './Tweet';
import { calcualteTotalPages } from 'src/utils';
import ReactPaginate from 'react-paginate';

type Props = { tweets?: TweetType[]; isFetching: Boolean; tweetsPerPage?: number };

const SocialFeed: FC<Props> = ({ tweets = [], isFetching = false, tweetsPerPage = 15 }) => {
  const [page, setPage] = useState(0);
  const [visibleTweets, setVisibleTweets] = useState(tweets);
  const totalPages = calcualteTotalPages(tweets.length, 10);

  useEffect(() => {
    const pagedTweets = tweets.slice(page * tweetsPerPage, (page + 1) * tweetsPerPage);

    setVisibleTweets(pagedTweets);
  }, [page, tweets]);

  return (
    <Box>
      <Box fontWeight="medium" textTransform="uppercase" mb={2}>
        Social Feed
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.500"></Box>
      </Box>

      {isFetching ? (
        <Flex justify="center" w="100%" p={10}>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.300" color="blue.900" size="lg" />
        </Flex>
      ) : (
        <>
          <Box maxH="75vh" overflow="auto">
            {visibleTweets.map((tweet: TweetType) => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </Box>

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
        </>
      )}
    </Box>
  );
};

export default SocialFeed;
