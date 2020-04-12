import { useState, useEffect } from 'react';
import Axios from 'axios';

export const usePosts = (lastPostId) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const query = lastPostId ? `&before=${lastPostId}` : '';
    Axios.get(
      `https://www.dcard.tw/_apicors/posts?popular=true${query}`
    ).then((res) => {
      setPosts(prevPosts => [...prevPosts, ...res.data]);
    });
  }, [lastPostId]);

  return posts;
}
