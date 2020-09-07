import React from 'react';
import {
  Box,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody
} from '@chakra-ui/core';
import { YoutubeVideo as YoutubeVideoInterface } from '../../interfaces/youtubeVideo';
import YouTube from 'react-youtube';

type Props = {
  video: YoutubeVideoInterface;
  displayTeamLink?: boolean;
  noBorder?: boolean;
};

const YoutubeVideo = ({ video, noBorder = false, displayTeamLink = false }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const opts: any = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1
    }
  };

  return (
    <Box
      {...(!noBorder ? { borderBottomWidth: '1px' } : {})}
      p={3}
      cursor="pointer"
      minWidth={250}
      onClick={onOpen}
    >
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />

        <ModalContent background="transparent" boxShadow="none" alignItems="center">
          <ModalBody position="relative" maxW="940px" w="100%" h="100%">
            <ModalCloseButton color="white" top={-25} fontWeight="bold" />

            <YouTube
              videoId={video.videoId}
              opts={opts}
              containerClassName="youtubeContainer"
              onError={props => console.error('error', props)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>

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
