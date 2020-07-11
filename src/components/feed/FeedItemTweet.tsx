import React, { FC } from 'react';
import { Tweet } from '../../interfaces/tweet';
import { formatDistanceToNow } from 'date-fns';
import { FaTwitter, FaRetweet, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Box, Image, Flex, Link } from '@chakra-ui/core';

type Props = {
  tweet: Tweet;
};

export const FeedItemTweet: FC<Props> = ({ tweet }) => {
  console.log(tweet);
  const formattedDate = formatDistanceToNow(new Date(tweet.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      boxShadow="md"
      margin="auto"
      bg="white"
    >
      <Image src={tweet.profileBannerUrl} alt="profile banner" ignoreFallback objectFit="cover" />

      <Flex justifyContent="space-between" alignItems="center" px={5} py={3}>
        <Link href={`https://www.twitter.com/${tweet.screenName}`} isExternal>
          <Flex alignItems="center">
            <Box color="blue.300" mr={1}>
              <FaTwitter />
            </Box>

            <Box fontSize="sm">{tweet.name}</Box>
          </Flex>
        </Link>

        <Box color="gray.500" fontSize="xs" fontStyle="italic">
          {formattedDate}
        </Box>
      </Flex>

      <Box px={5} py={3} h="150px">
        <Link
          href={`https://www.twitter.com/${tweet.screenName}/status/${tweet.tweetId}`}
          isExternal
        >
          {tweet.text}
        </Link>
      </Box>

      <Flex justifyContent="space-evenly" borderTop="1px" borderColor="gray.200">
        <Box p={2}>
          <Link
            href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.tweetId}`}
            title="reply"
          >
            <FaRegComment />
          </Link>
        </Box>

        <Box p={2}>
          <Link
            href={`https://twitter.com/intent/retweet?tweet_id=${tweet.tweetId}`}
            title="retweet"
          >
            <FaRetweet />
          </Link>
        </Box>

        <Box p={2}>
          <Link href={`https://twitter.com/intent/like?tweet_id=${tweet.tweetId}`} title="like">
            <FaRegHeart />
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};
