import React from 'react';
import { YoutubeVideo as YoutubeVideoInterface } from './../../interfaces/youtubeVideo';
import { Box, Flex, Text } from '@chakra-ui/core';
import Loader from '../Loader';
import YoutubeVideo from './YoutubeVideo';
import { FaRegFrown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';

type Props = {
  videos?: YoutubeVideoInterface[];
  isFetching: Boolean;
};

const YoutubeVideosPreview = ({ videos = [], isFetching = false }: Props) => {
  return (
    <Box bg="white" p={6} boxShadow="sm">
      <SectionHeader title="Latest Videos" />

      {isFetching ? (
        <Loader />
      ) : (
        <Box>
          <Flex overflow="auto">
            {videos.map(video => (
              <YoutubeVideo key={video.id} video={video} displayTeamLink noBorder />
            ))}
          </Flex>

          {!!videos.length ? (
            <Box marginBottom={-6}>
              <Flex justifyContent="flex-end" pb={3}>
                <Link to="/videos">
                  <Flex color="blue.700" p={1} alignItems="center">
                    <Text>View all</Text>
                  </Flex>
                </Link>
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

export default YoutubeVideosPreview;
