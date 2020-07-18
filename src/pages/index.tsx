import React, { FC, useState } from 'react';
import FeedGrid from '../components/feed/FeedGrid';

const HomePage: FC = () => {
  const [feedItems, setFeedItems] = useState([]);

  return <FeedGrid data={feedItems} />;
};

export default HomePage;
