import React, { FC } from 'react';
import { Box, Flex, Link, Image, Text } from '@chakra-ui/core';
import { Tweet as TweetType } from './../../interfaces/tweet';
import { formatDistanceToNow } from 'date-fns';

type Props = { tweet: TweetType };

const Tweet: FC<Props> = ({ tweet }) => {
  const formattedDate = formatDistanceToNow(new Date(tweet.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box borderBottomWidth="1px" py={3}>
      <Flex wrap="wrap">
        {tweet.profileImageUrl && (
          <Box pt={1} pr={3}>
            <Link href={`https://www.twitter.com/${tweet.screenName}`} isExternal>
              <Image
                rounded="full"
                src={tweet.profileImageUrl}
                title={tweet.screenName}
                alt={tweet.screenName}
                ignoreFallback
                objectFit="cover"
                width="25px"
              />
            </Link>
          </Box>
        )}

        <Box flex={1}>
          <Link
            href={`https://www.twitter.com/${tweet.screenName}/status/${tweet.tweetId}`}
            isExternal
            color="blue.700"
          >
            <Text m={0} lineHeight="shorter" fontWeight="semibold">
              {tweet.text}
            </Text>
          </Link>

          <Flex>
            <Box color="gray.700" fontSize="xs" pr={2}>
              {tweet.twitterAccount?.team?.fullName} |
            </Box>

            <Box color="gray.500" fontSize="xs" fontStyle="italic">
              {formattedDate}
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Tweet;
