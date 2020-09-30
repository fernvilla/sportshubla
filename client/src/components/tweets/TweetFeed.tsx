import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import { default as TweetInterface } from './../../interfaces/tweet';
import Tweet from './Tweet';
import { calculateTotalPages } from './../../utils/feed';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader';
import { FaRegFrown } from 'react-icons/fa';
import SectionHeader from '../SectionHeader';
import { Link } from 'react-router-dom';
import Card from '../Card';

type Props = {
  tweets?: TweetInterface[];
  isFetching: Boolean;
  tweetsPerPage?: number;
  displayTeamLink?: boolean;
  isPreview?: boolean;
};

const TweetFeed = ({
  tweets = [],
  isFetching = false,
  tweetsPerPage = 10,
  displayTeamLink = false,
  isPreview = false
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
    <>
      <SectionHeader title="Tweets" />

      <Box ref={ref}>
        {isFetching ? (
          <Loader />
        ) : (
          <Card mb={4}>
            <Box overflow="auto">
              {visibleTweets.map((tweet: TweetInterface) => (
                <Tweet key={tweet.id} tweet={tweet} displayTeamLink={displayTeamLink} />
              ))}
            </Box>

            {!!tweets.length ? (
              <Box marginBottom={-6}>
                <Flex justifyContent="flex-end">
                  {isPreview ? (
                    <Link to="/tweets">
                      <Flex color="blue.700" my={4} p={1} alignItems="center">
                        <Text>View all</Text>
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
              <Flex justifyContent="center" padding={5}>
                <Box textAlign="center">
                  <Flex justifyContent="center" fontSize="2xl">
                    <FaRegFrown />
                  </Flex>
                  No Tweets Available
                </Box>
              </Flex>
            )}
          </Card>
        )}
      </Box>
    </>
  );
};

export default TweetFeed;
