import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/core';
import { default as ArticleInterface } from './../../interfaces/article';
import { formatDistanceToNow } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import { FaRegClock } from 'react-icons/fa';
import Card from '../Card';

interface Props {
  article: ArticleInterface;
  displayTeamLink?: boolean;
}

const Article = ({ article, displayTeamLink = true }: Props) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Card mb={4}>
      {/* <Link href={article.url} isExternal>
        <Image
          src={article.image}
          title={article.title}
          alt={article.title}
          ignoreFallback
          objectFit="cover"
          width={100}
        />
      </Link> */}

      <Flex alignItems="center">
        {displayTeamLink && (
          <RouterLink to={`/teams/${article.newsFeed?.team?.slug}`}>
            <Text
              as="span"
              fontSize="xs"
              backgroundColor={`${article.newsFeed?.team?.shortName
                .replace(/\s/g, '-')
                .toLocaleLowerCase()}-color`}
              color="#fff"
              borderRadius="full"
              padding="4px 10px"
              mr={2}
              display="inline-block"
              lineHeight="1"
              boxShadow="sm"
            >
              {article.newsFeed?.team?.shortName}
            </Text>
          </RouterLink>
        )}

        <Flex
          color="gray.500"
          fontSize="xs"
          fontStyle="italic"
          alignItems="center"
          display="inline-flex"
        >
          <Box display="inline" mr={1}>
            <FaRegClock />
          </Box>

          <Text as="span">{formattedDate}</Text>
        </Flex>
      </Flex>

      <Link href={article.url} isExternal>
        <Text as="h1" fontWeight="semibold" fontSize="lg" my={1} wordBreak="break-word">
          {article.title}
        </Text>
      </Link>

      <Text as="span" fontSize="sm" color="brand-secondary">
        Source: {article.newsFeed?.newsSource?.name}
      </Text>

      {article.summary && !!article.summary.length && (
        <Text as="p" mt={4} color="gray.700" className="truncated-text" wordBreak="break-word">
          Summary: {article.summary}
        </Text>
      )}
    </Card>
  );
};

export default Article;
