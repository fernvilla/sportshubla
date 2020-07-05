import React, { Fragment } from 'react';
import fetch from 'isomorphic-unfetch';
import { GetServerSideProps } from 'next';
import { Team } from '../interfaces/team';
import { Tweet } from '../interfaces/tweet';
import FeedGrid from '../components/feed/FeedGrid';
// import { MostViewed } from '../components/feed/MostViewed';

type Props = {
  tweets?: Tweet[];
  teams?: Team[];
};

const HomePage: React.FC<Props> = ({ tweets }) => {
  return (
    <div>
      <div>
        <FeedGrid data={tweets} />
      </div>

      {/* <div>
        <MostViewed />
      </div> */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [tweets, teams] = await Promise.all([
    fetch(`http://localhost:3000/api/tweets`),
    fetch(`http://localhost:3000/api/teams`)
  ]);
  const tweetData = await tweets.json();
  const teamData = await teams.json();

  return {
    props: {
      tweets: tweetData,
      teams: teamData
    }
  };
};

export default HomePage;
