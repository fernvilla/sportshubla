import React from 'react';
import { Box, Flex, Link, Image, Text } from '@chakra-ui/core';
import { default as TweetInterface } from './../../interfaces/tweet';
import { formatDistanceToNow } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';

type Props = { tweet: TweetInterface; displayTeamLink?: boolean };

const Tweet = ({ tweet, displayTeamLink = false }: Props) => {
  const formattedDate = formatDistanceToNow(new Date(tweet.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box borderBottomWidth="1px" py={3} pr={2}>
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
            <Text m={0} lineHeight="shorter" fontWeight="medium">
              {tweet.text}
            </Text>
          </Link>

          <Flex flexWrap="wrap">
            {displayTeamLink && (
              <RouterLink to={`/teams/${tweet.twitterAccount?.team?.slug}`}>
                <Box color="gray.700" fontSize="xs" pr={1}>
                  {tweet.twitterAccount?.team?.name} |
                </Box>
              </RouterLink>
            )}

            <Box color="gray.700" fontSize="xs" pr={1}>
              @{tweet.screenName} -
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
