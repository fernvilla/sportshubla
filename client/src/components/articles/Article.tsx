import React from 'react';
import { Box, Flex, Link, Image, Text } from '@chakra-ui/core';
import { default as ArticleInterface } from './../../interfaces/article';
import { formatDistanceToNow } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';

type Props = { article: ArticleInterface; displayTeamLink?: boolean; noBorder?: boolean };

const Article = ({ article, displayTeamLink = false, noBorder = false }: Props) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box {...(!noBorder ? { borderBottomWidth: '1px' } : {})} p={3}>
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
            <Text as="p" color="blue.700" fontWeight="medium">
              {article.title}
            </Text>
          </Link>

          <Flex flexWrap="wrap">
            <Box color="gray.700" fontSize="xs" pr={1}>
              {displayTeamLink && (
                <RouterLink to={`/teams/${article.newsFeed?.team?.slug}`}>
                  {article.newsFeed?.team?.name} |{' '}
                </RouterLink>
              )}
              {article.newsFeed?.newsSource?.name} -
            </Box>

            <Box color="gray.500" fontSize="xs" fontStyle="italic">
              {formattedDate}
            </Box>
          </Flex>

          {article.summary && (
            <Text as="p" mt={2} color="gray.700" className="truncated-text">
              {article.summary}
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Article;
