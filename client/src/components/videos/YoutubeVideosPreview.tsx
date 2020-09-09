import React from 'react';
import { YoutubeVideo as YoutubeVideoInterface } from './../../interfaces/youtubeVideo';
import { Box, Heading, Flex, PseudoBox, Text } from '@chakra-ui/core';
import Loader from '../Loader';
import YoutubeVideo from './YoutubeVideo';
import { FaRedo, FaRegFrown, FaAngleDoubleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type Props = {
  videos?: YoutubeVideoInterface[];
  isFetching: Boolean;
  videosPerPage?: number;
  displayTeamLink?: boolean;
  refetchData?: () => void;
};

const YoutubeVideosPreview = ({ videos = [], isFetching = false, refetchData }: Props) => {
  return (
    <Box bg="white" p={6} boxShadow="sm">
      <Flex justifyContent="space-between" alignItems="baseline">
        <Heading as="h2" size="sm" textTransform="uppercase" mb={2} fontWeight="normal">
          Latest Videos
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
            {videos.map(video => (
              <YoutubeVideo key={video.id} video={video} displayTeamLink noBorder />
            ))}
          </Flex>

          {!!videos.length ? (
            <Box marginBottom={-6}>
              <Flex justifyContent="flex-end" pb={3}>
                <Link to="/videos">
                  <Flex color="blue.700" alignItems="center">
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
