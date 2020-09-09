import React from 'react';
import {
  Box,
  Flex,
  Link,
  Image,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/core';
import { default as TweetInterface } from './../../interfaces/tweet';
import { formatDistanceToNow } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import { FaRegComment, FaRetweet, FaRegHeart, FaEllipsisV } from 'react-icons/fa';

type Props = {
  tweet: TweetInterface;
  displayTeamLink?: boolean;
  noBorder?: boolean;
};

const Tweet = ({ tweet, displayTeamLink = false, noBorder = false }: Props) => {
  const formattedDate = formatDistanceToNow(new Date(tweet.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box {...(!noBorder ? { borderBottomWidth: '1px' } : {})} py={3} pr={2}>
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

        <Box color="blue.700" cursor="pointer" fontWeight="light">
          <Menu autoSelect={false}>
            <MenuButton p={2} mt={-2}>
              <FaEllipsisV />
            </MenuButton>

            <MenuList placement="auto">
              <MenuItem>
                <Link
                  href={`https://twitter.com/intent/tweet?in_reply_to=${tweet.tweetId}`}
                  title="reply"
                  isExternal
                >
                  <Flex alignItems="center">
                    <FaRegComment />
                    <Text as="span" pl={2}>
                      Comment
                    </Text>
                  </Flex>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  href={`https://twitter.com/intent/retweet?tweet_id=${tweet.tweetId}`}
                  title="retweet"
                  isExternal
                >
                  <Flex alignItems="center">
                    <FaRetweet />
                    <Text as="span" pl={2}>
                      Retweet
                    </Text>
                  </Flex>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link
                  href={`https://twitter.com/intent/like?tweet_id=${tweet.tweetId}`}
                  title="like"
                  isExternal
                >
                  <Flex alignItems="center">
                    <FaRegHeart />
                    <Text as="span" pl={2}>
                      Like
                    </Text>
                  </Flex>
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Tweet;
