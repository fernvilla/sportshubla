import React from 'react';
import { TweetData } from '../interfaces/tweet';
import useAxios from '../hooks/useAxios';
import { YoutubeVideoData } from '../interfaces/youtubeVideo';
import { ArticleData } from '../interfaces/article';
import FeedLayout from '../components/feed/FeedLayout';

const Home = () => {
  const { response: articles, isLoading: fetchingArticles }: ArticleData = useAxios({
    url: '/api/articles/latest'
  });

  const { response: tweets, isLoading: fetchingTweets }: TweetData = useAxios({
    url: '/api/tweets/latest'
  });

  const { response: videos, isLoading: fetchingVideos }: YoutubeVideoData = useAxios({
    url: '/api/youtubevideos/latest'
  });

  return (
    <FeedLayout
      articles={articles}
      fetchingArticles={fetchingArticles}
      tweets={tweets}
      fetchingTweets={fetchingTweets}
      videos={videos}
      fetchingVideos={fetchingVideos}
      isPreview
      displayTeamLink
    />
  );
};

export default Home;
