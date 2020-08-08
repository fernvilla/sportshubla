import React, { FC } from 'react';
import { Box, Flex, Link, Image, Text } from '@chakra-ui/core';
import { Article as ArticleType } from './../../interfaces/article';
import { formatDistanceToNow } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';

type Props = { article: ArticleType; displayTeamLink?: boolean };

const Article: FC<Props> = ({ article, displayTeamLink = false }) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box borderBottomWidth="1px" py={4}>
      <Flex wrap="wrap">
        {article.image && (
          <Box pt={1} pr={4}>
            <Link href={article.url} isExternal>
              <Image
                src={article.image}
                title={article.title}
                alt={article.title}
                ignoreFallback
                objectFit="cover"
                width={100}
              />
            </Link>
          </Box>
        )}

        <Box flex={1}>
          <Link href={article.url} isExternal>
            <Text color="blue.700" fontWeight="medium">
              {article.title}
            </Text>
          </Link>

          <Flex flexWrap="wrap">
            <Box color="gray.700" fontSize="xs" pr={1}>
              {displayTeamLink && (
                <RouterLink to={`/teams/${article.newsSource?.team?.slug}`}>
                  {article.newsSource?.team?.fullName} |{' '}
                </RouterLink>
              )}
              {article.newsSource?.name} -
            </Box>

            <Box color="gray.500" fontSize="xs" fontStyle="italic">
              {formattedDate}
            </Box>
          </Flex>

          {article.summary && (
            <Box mt={2} color="gray.700">
              {article.summary}
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Article;
