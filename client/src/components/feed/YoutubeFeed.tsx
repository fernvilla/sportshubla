import React, { useState, useEffect } from 'react';
import { YoutubeVideo as YoutubeVideoInterface } from './../../interfaces/youtubeVideo';
import { Box, Heading, Flex } from '@chakra-ui/core';
import Loader from '../Loader';
import YoutubeVideo from './YoutubeVideo';
import { calculateTotalPages } from '../../utils/feed';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';

type Props = {
  videos?: YoutubeVideoInterface[];
  isFetching: Boolean;
  videosPerPage?: number;
  displayTeamLink?: boolean;
};

const YoutubeFeed = ({
  videos = [],
  isFetching = false,
  videosPerPage = 5,
  displayTeamLink = false
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
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box bg="white" p={6} mb={5} boxShadow="sm" ref={ref}>
      <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
        Videos
        <Box borderBottomWidth="3px" width={10} borderBottomColor="gray.400"></Box>
      </Heading>

      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Box overflow="auto">
            {visibleTweets.map((video: YoutubeVideoInterface) => (
              <YoutubeVideo key={video.id} video={video} displayTeamLink={displayTeamLink} />
            ))}
          </Box>

          {!!videos.length && (
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

export default YoutubeFeed;
