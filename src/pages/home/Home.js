import React, { useState } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { Box } from 'rebass';

import { usePosts } from './homeHooks';
import List from '../../components/List';
import DcardListTile from '../../components/DcardListTile';

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
          maxWidth: ['90%', '60%', '50%'],
          mx: 'auto',
          px: 3,
          backgroundColor: '#eee'
        }}
      >
        <List 
          items={posts}
          itemBuilder={(post) => (
            <DcardListTile
              key={post.id}
              post={post}
              onClick={() => history.push({
                pathname: `${url}/${post.forumAlias}/p/${post.id}`,
                state: { isModal: location }
              })}
            />
          )}
          fetchMore={(items) => setLastPostId(items && items.length ? items[items.length - 1].id : null)}
        />
      </Box>
    </>
  );
};

export default Home;