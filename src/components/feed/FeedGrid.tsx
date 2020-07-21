import React, { FC } from 'react';
import { FeedItemTweet } from './FeedItemTweet';
import { FeedItem } from 'src/interfaces/feedItem';
import { Box } from '@chakra-ui/core';
import Masonry from 'react-masonry-css';
import { FeedItemArticle } from './FeedItemArticle';
type Props = {
  data?: FeedItem[];
};

const FeedGrid: FC<Props> = ({ data = [] }) => {
  const renderItem = (data: FeedItem) => {
    if (data.feedItemType.type === 'tweet') {
      return <FeedItemTweet key={`tweet-${data.tweet.id}`} tweet={data.tweet} />;
    }

    if (data.feedItemType.type === 'article') {
      return <FeedItemArticle key={`article-${data.article.id}`} article={data.article} />;
    }

    return null;
  };

  return (
    <Box px={10} py={10} w="100%" maxW={1400} mx="auto">
      <Masonry
        breakpointCols={{
          default: 4,
          1199: 3,
          991: 2,
          767: 1
        }}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {data.map(d => renderItem(d))}
      </Masonry>
    </Box>
  );
};

export default FeedGrid;
