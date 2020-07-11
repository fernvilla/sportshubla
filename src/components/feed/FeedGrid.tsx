import React, { FC } from 'react';
import { FeedItemTweet } from './FeedItemTweet';
import { FeedItem } from 'src/interfaces/feedItem';
import { Grid, Flex } from '@chakra-ui/core';

type Props = {
  data?: FeedItem[];
};

const FeedGrid: FC<Props> = ({ data = [] }) => {
  const renderItem = (data: FeedItem) => {
    if (data.feedItemType.type === 'tweet') {
      return <FeedItemTweet key={data.tweet.id} tweet={data.tweet} />;
    }

    return null;
  };

  return (
    <Flex justify="center" w="100%">
      <Grid
        p={10}
        w="100%"
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={6}
        autoRows="auto"
        maxW={1600}
      >
        {data.map(d => renderItem(d))}
      </Grid>
    </Flex>
  );
};

export default FeedGrid;
