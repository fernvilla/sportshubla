import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, PseudoBox } from '@chakra-ui/core';
import { default as TweetInterface } from './../../interfaces/tweet';
import Tweet from './Tweet';
import { calculateTotalPages } from './../../utils/feed';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';
import { FaRedo, FaRegFrown } from 'react-icons/fa';
import SectionHeader from '../SectionHeader';

type Props = {
  tweets?: TweetInterface[];
  isFetching: Boolean;
  tweetsPerPage?: number;
  displayTeamLink?: boolean;
  refetchData?: () => void;
};

const TweetsFeed = ({
  tweets = [],
  isFetching = false,
  tweetsPerPage = 10,
  displayTeamLink = false,
  refetchData
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
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm" ref={ref}>
      <Flex justifyContent="space-between" alignItems="baseline">
        <SectionHeader title="Tweets" />

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
          <Box overflow="auto">
            {visibleTweets.map((tweet: TweetInterface) => (
              <Tweet key={tweet.id} tweet={tweet} displayTeamLink={displayTeamLink} />
            ))}
          </Box>

          {!!tweets.length ? (
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
                No Tweets Available
              </Box>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
};

export default TweetsFeed;
