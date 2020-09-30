import React from 'react';
import {
  Box,
  Image,
  // useDisclosure,
  // Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalCloseButton,
  // ModalBody,
  PseudoBox,
  Link
} from '@chakra-ui/core';
import { YoutubeVideo as YoutubeVideoInterface } from '../../interfaces/youtubeVideo';
// import YouTube from 'react-youtube';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  video: YoutubeVideoInterface;
  displayTeamLink?: boolean;
}

const YoutubeVideo = ({ video, displayTeamLink = false }: Props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const opts: any = {
  //   playerVars: {
  //     // https://developers.google.com/youtube/player_parameters
  //     autoplay: 0,
  //     enablejsapi: 1,
  //     origin: 'http://www.sportshub.la',
  //     rel: 1
  //   }
  // };

  const formattedDate = formatDistanceToNow(new Date(video.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  // return (
  //   <iframe
  //     width="560"
  //     height="315"
  //     src="https://www.youtube.com/embed/VugLFeJkEwA?origin=https://127.0.0.1:3000/"
  //     frameBorder="0"
  //     allowFullScreen
  //   ></iframe>
  // );

  return (
    <Box
      p={3}
      cursor="pointer"
      minWidth={200}
      // onClick={onOpen}
    >
      {/* <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />

        <ModalContent background="transparent" boxShadow="none" alignItems="center">
          <ModalBody position="relative" maxW="940px" w="100%" h="100%">
            <ModalCloseButton color="white" top={-25} fontWeight="bold" />

            <YouTube
              videoId={video.videoId}
              opts={opts}
              containerClassName="youtubeContainer"
              onError={error => console.error('error', error)}
            />
          </ModalBody>
        </ModalContent>
      </Modal> */}

      <Link isExternal href={`https://www.youtube.com/watch?v=${video.videoId}`}>
        <PseudoBox pos="relative" _hover={{ outline: '2px solid #1e4e8c' }}>
          {/* {displayTeamLink && <Box display="inline">{video.youtubeAccount?.team?.shortName}: </Box>} */}

          <Image src={video.thumbnail} ignoreFallback alt={video.title} title={video.title} />

          <Box
            color="white"
            bg="black"
            p={2}
            pos="absolute"
            bottom={0}
            minH="60px"
            w="100%"
            lineHeight="shorter"
          >
            <Box className="truncated-text">{video.title}</Box>
            <Box
              display="inline"
              color="gray.200"
              fontSize="xs"
              fontStyle="italic"
              letterSpacing="tight"
            >
              {formattedDate}
            </Box>
          </Box>
        </PseudoBox>
      </Link>
    </Box>
  );
};

export default YoutubeVideo;
