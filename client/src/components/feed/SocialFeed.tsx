import React, { useState, useEffect } from 'react';
import { Box, Flex, Spinner, Heading } from '@chakra-ui/core';
import { Tweet as TweetType } from './../../interfaces/tweet';
import Tweet from './Tweet';
import { calcualteTotalPages } from './../../utils/feed';
import ReactPaginate from 'react-paginate';
import { scrollTo } from '../../utils/window';
import Loader from '../Loader';

type Props = {
  tweets?: TweetType[];
  isFetching: Boolean;
  tweetsPerPage?: number;
  displayTeamLink?: boolean;
};

const SocialFeed = ({
  tweets = [],
  isFetching = false,
  tweetsPerPage = 10,
  displayTeamLink = false
}: Props) => {
  const [page, setPage] = useState(0);
  const [visibleTweets, setVisibleTweets] = useState(tweets);
  const totalPages = calcualteTotalPages(tweets.length, tweetsPerPage);

  useEffect(() => {
    const pagedTweets = tweets.slice(page * tweetsPerPage, (page + 1) * tweetsPerPage);

    setVisibleTweets(pagedTweets);
  }, [page, tweets, tweetsPerPage]);

  const onPageChange = ({ selected }: { selected: number }) => {
    scrollTo(0, () => setPage(selected));
  };

  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm">
      <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
        Social Feed
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Heading>

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Box overflow="auto">
            {visibleTweets.map((tweet: TweetType) => (
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

export default SocialFeed;
