import React, { FC } from 'react';
import { Tweet } from '../../interfaces/tweet';
import { formatDistanceToNow } from 'date-fns';
import { FaTwitter, FaRetweet, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Box, Image, Flex, Link } from '@chakra-ui/core';

type Props = { tweet: Tweet };

export const FeedItemTweet: FC<Props> = ({ tweet }) => {
  console.log('tweet', tweet);
  const formattedDate = formatDistanceToNow(new Date(tweet.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      boxShadow="md"
      mb={5}
      mx="auto"
      bg="white"
    >
      {tweet.mediaUrl && (
        <Image
          src={tweet.mediaUrl}
          alt="tweet media"
          ignoreFallback
          objectFit="cover"
          width="100%"
        />
      )}

      <Box px={5} py={3}>
        <Link href={`https://www.twitter.com/${tweet.screenName}`} isExternal>
          <Flex align="flex-start" justify="space-between">
            <Box>
              <Flex align="center">
                <Image
                  src={tweet.profileImageUrl}
                  rounded="full"
                  alt="profile logo"
                  ignoreFallback
                  objectFit="cover"
                  height={5}
                  mr={2}
                />

                <Box fontSize="sm">{tweet.name}</Box>
              </Flex>
            </Box>

            <Box color="blue.300">
              <FaTwitter />
            </Box>
          </Flex>
        </Link>

        <Box color="gray.500" fontSize="xs" fontStyle="italic">
          {formattedDate}
        </Box>
      </Box>

      <Box px={5} pb={3}>
        <Link
          href={`https://www.twitter.com/${tweet.screenName}/status/${tweet.tweetId}`}
          isExternal
        >
          {tweet.text}
        </Link>
      </Box>

      <Flex justify="space-evenly" borderTop="1px" borderColor="gray.200">
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
