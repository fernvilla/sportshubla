import React, { useEffect, useRef, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { Box, Flex, Grid } from '@chakra-ui/core';
import { CONTENT_WRAPPER_WIDTH } from '../globals/constants';
import YoutubeVideo from '../components/videos/YoutubeVideo';
import { calculateTotalPages } from '../utils/feed';
import { default as YoutubeVideoInterface, YoutubeVideoData } from './../interfaces/youtubeVideo';
import ReactPaginate from 'react-paginate';
import { scrollToCallback } from '../utils/window';
import Loader from '../components/Loader';
import { OptionTypeBase, ValueType } from 'react-select';
import FeedFilter from '../components/feed/FeedFilter';

const Videos = () => {
  const { response: videos = [], isLoading }: YoutubeVideoData = useAxios({
    url: '/api/youtubevideos'
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTeams, setSelectedTeams] = useState<number[]>([]);
  const [visibleVideos, setVisibleVideos] = useState<YoutubeVideoInterface[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videosPerPage = 30;
    const filteredVideos = selectedTeams?.length
      ? videos.filter(video => selectedTeams.includes(video.youtubeAccount?.team?.id || -1))
      : videos;
    const pagedVideos = filteredVideos.slice(page * videosPerPage, (page + 1) * videosPerPage);

    setVisibleVideos(pagedVideos);
    setTotalPages(calculateTotalPages(filteredVideos.length, videosPerPage));
  }, [page, videos, selectedTeams]);

  const onPageChange = ({ selected }: { selected: number }) => {
    const offset = ref.current ? ref.current.offsetTop : 0;

    scrollToCallback(offset - 100, () => setPage(selected));
  };

  const onSelectTeams = (values: ValueType<OptionTypeBase>) => {
    setSelectedTeams(values?.map((val: { value: number; label: string }) => val.value) || []);
  };

  return (
    <Box px={3} py={5} mt={3} maxWidth={CONTENT_WRAPPER_WIDTH} mx="auto" ref={ref}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <FeedFilter onSelect={onSelectTeams} />

          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" columnGap={4}>
            {visibleVideos.map(video => (
              <YoutubeVideo video={video} key={video.id} />
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

export default Videos;
