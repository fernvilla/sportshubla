import React, { FC } from 'react';
import { Tweet } from '../../interfaces/tweet';
import { FeedGridItem } from './FeedGridItem';
// import './feed.scss';

type Props = {
  data?: Tweet[];
};

const FeedGrid: FC<Props> = ({ data = [] }) => {
  return (
    <div className="cards grid gap-10 grid-flow-row justify-center ">
      {data.map(d => (
        <FeedGridItem item={d} key={d.id} />
      ))}
    </div>
  );
};

export default FeedGrid;
