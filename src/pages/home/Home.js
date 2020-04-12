import React, { useState } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { Box, Card, Heading, Text } from 'rebass';

import { usePosts } from './homeHooks';
import List from '../../components/List';

const Home = () => {
  const [lastPostId, setLastPostId] = useState();
  const posts = usePosts(lastPostId);
  const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <Box
        sx={{
          maxWidth: ['80%', '60%', '50%'],
          mx: 'auto',
          px: 3,
          backgroundColor: '#eee'
        }}
      >
        <List 
          items={posts}
          itemBuilder={(post) => (
            <Card
              key={post.id}
              sx={{
                p: 3,
                cursor: 'pointer'
              }}
              onClick={() => history.push({
                pathname: `${url}/${post.forumAlias}/p/${post.id}`,
                state: { isModal: location }
              })}
            >
              <Heading color='rgba(0, 0, 0, 0.95)' fontWeight='600'>{post.title}</Heading>
              <Text color='rgba(0, 0, 0, 0.6)'>{post.excerpt}</Text>
            </Card>
          )}
          fetchMore={() => setLastPostId(posts[posts.length - 1].id)}
        />
      </Box>
    </>
  );
};

export default Home;