import React, { FC, useState, useEffect } from 'react';
import FeedGrid from '../components/feed/FeedGrid';
import { Spinner, Flex, Box } from '@chakra-ui/core';

const HomePage: FC = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetchFeedItems();
  }, []);

  const fetchFeedItems = async () => {
    try {
      setDataFetched(false);

      const res = await fetch('/api/feeditems');
      const data = await res.json();

      setFeedItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDataFetched(true);
    }
  };

  if (!dataFetched) {
    return (
      <Flex justify="center" w="100%" p={10}>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
      </Flex>
    );
  }

  return (
    <Box as="main">
      <FeedGrid data={feedItems} />
    </Box>
  );
};

export default HomePage;
