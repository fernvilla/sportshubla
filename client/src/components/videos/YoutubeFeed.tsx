import React, { useState, useEffect } from 'react';
import { YoutubeVideo as YoutubeVideoInterface } from './../../interfaces/youtubeVideo';
import { Box, Flex, PseudoBox, Grid } from '@chakra-ui/core';
import Loader from '../Loader';
import YoutubeVideo from './YoutubeVideo';
import { calculateTotalPages } from '../../utils/feed';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';
import { FaRedo, FaRegFrown } from 'react-icons/fa';
import SectionHeader from '../SectionHeader';

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
  videosPerPage = 8,
  displayTeamLink = false,
  refetchData
}: Props) => {
  const [page, setPage] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState(videos);
  const totalPages = calculateTotalPages(videos.length, videosPerPage);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videos || !videos.length) return setVisibleVideos([]);

    const pagedTweets = videos.slice(page * videosPerPage, (page + 1) * videosPerPage);

    setVisibleVideos(pagedTweets);
  }, [page, videos, videosPerPage]);

  const onPageChange = ({ selected }: { selected: number }) => {
    scrollTo();
    setTimeout(() => setPage(selected), 500);
  };

  const scrollTo = () => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box bg="white" p={6} boxShadow="sm" ref={ref}>
      <Flex justifyContent="space-between" alignItems="baseline">
        <SectionHeader title="Videos" />

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
          <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))">
            {visibleVideos.map(video => (
              <YoutubeVideo key={video.id} video={video} displayTeamLink={displayTeamLink} />
            ))}
          </Grid>

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
