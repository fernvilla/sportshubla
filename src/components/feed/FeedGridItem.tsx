import React, { FC } from 'react';
import { Tweet } from '../../interfaces/tweet';
import { formatDistanceToNow } from 'date-fns';
import { FaTwitter, FaRetweet, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { Box, Image } from '@chakra-ui/core';

type Props = {
  item: Tweet;
};

export const FeedGridItem: FC<Props> = ({ item }) => {
  const formattedDate = formatDistanceToNow(new Date(item.publishedDate), {
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Image src={item.profileBannerUrl} alt="profile banner" />
    </Box>
  );

  return (
    <div className="card max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white relative pb-10 flex-col">
      <div className="h-24">
        <img
          className="w-full h-full object-cover"
          src={item.profileBannerUrl}
          alt="profile banner"
        />
      </div>

      <div className="px-6 py-4">
        <a
          href={`https://www.twitter.com/${item.screenName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-md flex flex-wrap items-center hover:text-gray-600 delay-100"
        >
          <div className="mr-2 text-blue-400">
            <FaTwitter />
          </div>

          {item.name}
        </a>

        <p className="text-xs text-gray-500 mt-1 mb-3 italic">{formattedDate}</p>

        <p className="text-gray-800 text-sm hover:text-gray-600 delay-100">
          <a
            className="block break-all"
            href={`https://www.twitter.com/${item.screenName}/status/${item.tweetId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.text}
          </a>
        </p>
      </div>

      <div className="px-6 py-3 absolute bottom-0 w-full border-t border-gray-300 flex justify-around text-gray-500">
        <div className="cursor-pointer hover:text-gray-600 delay-100">
          <a href={`https://twitter.com/intent/tweet?in_reply_to=${item.tweetId}`} title="reply">
            <FaRegComment />
          </a>
        </div>

        <div className="cursor-pointer hover:text-gray-600 delay-100">
          <a href={`https://twitter.com/intent/retweet?tweet_id=${item.tweetId}`} title="retweet">
            <FaRetweet />
          </a>
        </div>

        <div className="cursor-pointer hover:text-gray-600 delay-100">
          <a href={`https://twitter.com/intent/like?tweet_id=${item.tweetId}`} title="like">
            <FaRegHeart />
          </a>
        </div>
      </div>
    </div>
  );
};
