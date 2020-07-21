import React, { FC } from 'react';
import { Article } from '../../interfaces/article';
import { formatDistanceToNow } from 'date-fns';
import { Box, Image, Link, Flex } from '@chakra-ui/core';
import { FaNewspaper } from 'react-icons/fa';

type Props = { article: Article };

export const FeedItemArticle: FC<Props> = ({ article }) => {
  console.log('article', article);

  const formattedDate = formatDistanceToNow(new Date(article.publishedDate), {
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
      {article.image && (
        <Image
          src={article.image}
          alt="article image"
          ignoreFallback
          objectFit="cover"
          width="100%"
        />
      )}

      <Box px={5} py={3}>
        <Flex align="flex-start" justify="space-between">
          <Box fontSize="sm">{article.newsSource.team?.fullName}</Box>

          <Box color="gray.500">
            <FaNewspaper />
          </Box>
        </Flex>

        <Box color="gray.500" fontSize="xs" fontStyle="italic">
          {formattedDate}
        </Box>
      </Box>

      <Box px={5} pb={3}>
        <Link href={article.url} isExternal>
          {article.title}
        </Link>
      </Box>
    </Box>
  );
};
