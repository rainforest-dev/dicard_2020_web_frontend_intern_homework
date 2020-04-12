import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Box, Heading, Text } from 'rebass';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] =  useState();

  useEffect(() => {
    Axios.get(`https://www.dcard.tw/_apicors/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  return (
    <Box
      sx={{
        width: ['80%', '60%', '50%'],
        minHeight: '100%',
        mx: 'auto',
        px: 3,
        backgroundColor: '#eee'
      }}
    >
      <Heading>{post && post.title}</Heading>
      <Text
        sx={{
          whiteSpace: 'pre-line'
        }}
      >
        {post && post.content}
      </Text>
    </Box>
  );
};

export default Post;