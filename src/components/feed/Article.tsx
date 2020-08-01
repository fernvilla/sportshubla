import React, { FC } from 'react';
import { Box, Flex, Link, Image } from '@chakra-ui/core';
import { Article as ArticleType } from 'src/interfaces/article';
import { formatDistanceToNow } from 'date-fns';

type Props = { article: ArticleType };

const Article: FC<Props> = ({ article }) => {
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
          <Link href={article.url} isExternal color="blue.700">
            {article.title}
          </Link>

          <Flex>
            <Box color="gray.700" fontSize="xs" pr={2}>
              {article.newsSource?.name} |
            </Box>

            <Box color="gray.500" fontSize="xs" fontStyle="italic">
              {formattedDate}
            </Box>
          </Flex>

          {article.summary && (
            <Box fontSize="sm" mt={2} color="gray.700">
              {article.summary}
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Article;
