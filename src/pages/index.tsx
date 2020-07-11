import React from 'react';
import fetch from 'isomorphic-unfetch';
import { GetServerSideProps } from 'next';
import FeedGrid from '../components/feed/FeedGrid';
import { FeedItem } from 'src/interfaces/feedItem';
import { League } from 'src/interfaces/league';
// import { MostViewed } from '../components/feed/MostViewed';

type Props = {
  feedItems?: FeedItem[];
  leagues?: League[];
};

const HomePage: React.FC<Props> = ({ feedItems }) => {
  return (
    <div>
      <div>
        <FeedGrid data={feedItems} />
      </div>

      {/* <div>
        <MostViewed />
      </div> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [feedItems, leagues] = await Promise.all([
    fetch(`http://localhost:3000/api/feedItems`),
    fetch(`http://localhost:3000/api/leagues`)
  ]);
  const feedData = await feedItems.json();
  const teamData = await leagues.json();

  return {
    props: {
      feedItems: feedData,
      teams: teamData
    }
  };
};

export default HomePage;
