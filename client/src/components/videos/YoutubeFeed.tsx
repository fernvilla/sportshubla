import React, { useState, useEffect } from 'react';
import { YoutubeVideo as YoutubeVideoInterface } from './../../interfaces/youtubeVideo';
import { Box, Heading, Flex, PseudoBox } from '@chakra-ui/core';
import Loader from '../Loader';
import YoutubeVideo from './YoutubeVideo';
import { calculateTotalPages } from '../../utils/feed';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';
import { FaRedo, FaRegFrown } from 'react-icons/fa';

type Props = {
  videos?: YoutubeVideoInterface[];
  isFetching: Boolean;
  videosPerPage?: number;
  displayTeamLink?: boolean;
  refetchData?: () => void;
};

const YoutubeFeed = ({
  videos = [],
  isFetching = false,
  videosPerPage = 5,
  displayTeamLink = false,
  refetchData
}: Props) => {
  const [page, setPage] = useState(0);
  const [visibleTweets, setVisibleTweets] = useState(videos);
  const totalPages = calculateTotalPages(videos.length, videosPerPage);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videos || !videos.length) return setVisibleTweets([]);

    const pagedTweets = videos.slice(page * videosPerPage, (page + 1) * videosPerPage);

    setVisibleTweets(pagedTweets);
  }, [page, videos, videosPerPage]);

  const onPageChange = ({ selected }: { selected: number }) => {
    scrollTo();
    setTimeout(() => setPage(selected), 500);
  };

  const scrollTo = () => {
    if (window.pageXOffset > 0) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box bg="white" p={6} boxShadow="sm" ref={ref}>
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
          Videos
          <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
        </Heading>

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
        <Box>
          <Flex overflow="auto">
            {visibleTweets.map((video: YoutubeVideoInterface) => (
              <YoutubeVideo key={video.id} video={video} displayTeamLink={displayTeamLink} />
            ))}
          </Flex>

          {!!videos.length ? (
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
                No Videos Available
              </Box>
            </Flex>
          )}
        </Box>
      )}
    </Box>
  );
};

export default YoutubeFeed;
