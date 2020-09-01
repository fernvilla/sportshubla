import React, { useState } from 'react';
import { Box, Image, Text } from '@chakra-ui/core';
import { YoutubeVideo as YoutubeVideoInterface } from '../../interfaces/youtubeVideo';
// @ts-ignore
import ModalVideo from 'react-modal-video';

import 'react-modal-video/scss/modal-video.scss';

type Props = {
  video: YoutubeVideoInterface;
  displayTeamLink?: boolean;
};

const YoutubeVideo = ({ video }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      borderBottomWidth="1px"
      p={3}
      cursor="pointer"
      minWidth={250}
      onClick={() => {
        if (isOpen) return;

        setIsOpen(true);
      }}
    >
      <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId={video.videoId}
        onClose={() => setIsOpen(false)}
      />

      <Box pos="relative">
        <Image src={video.thumbnail} ignoreFallback />
        <Text color="white" bg="black" opacity={0.8} p={2} pos="absolute" bottom={0}>
          {video.title}
        </Text>
      </Box>
    </Box>
  );
};

export default YoutubeVideo;
