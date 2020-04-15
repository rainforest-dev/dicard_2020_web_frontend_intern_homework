import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Flex, Box, Heading, Text, Image, Link } from 'rebass';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] =  useState();

  useEffect(() => {
    Axios.get(`https://www.dcard.tw/_apicors/posts/${id}`).then((res) => {
      setPost(res.data);
    });
  }, [id]);

  const isImageURL = (url) => (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  const extractURL = (str) => {
    const match = str.match(/((http(s)?(:\/\/))+(www\.)?([\w\-./])*(\.[a-zA-Z]{2,3}\/?))[^\s\b\n|]*[^.,;:?!@^$ -]/);
    if (match === null) return <Text p={1}>{ str }</Text>;
    const url = match[0];
    const others = str.split(url);
    return others.map((other, index) => {
      if (index === 0) return (<>
        {other !== '' ? <Text p={1} display="inline-block">{ other }</Text> : null}
        <Link href={url} target='_blank' sx={{ wordBreak: 'break-all' }}>{ url }</Link>
      </>);
      return extractURL(other);
    })
  };

  const getTimeStamp = (datestring) => {
    const date = new Date(datestring);
    return `
      ${date.getFullYear() !== new Date().getFullYear() ? date.getFullYear() +  ' 年 ' : ''}
      ${date.getMonth()} 月 ${date.getDate()} 日 ${date.getHours()} : ${date.getMinutes()}
    `;
  }

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        p: 5,
        backgroundColor: '#eee'
      }}
    >
      <Heading py={3}>{post && post.title}</Heading>
      <Flex pt={1} pb={4}>
        <Link href="#" px={1} sx={{ textDecoration: 'none' }}>{ post && post.forumName }</Link>
        <Text px={1}>{ post && getTimeStamp(post.createdAt) }</Text>
      </Flex>
      <>
        {post && post.content.split('\n').map(e => {
          if (!e.length) return (<Text sx={{ whiteSpace: 'pre-line' }}>{'\n'}</Text>)
          if (isImageURL(e)) return (<Image p={3} src={ e } onError={() => (<Link href={e} target='_blank'>{ e }</Link>)} />);

          return extractURL(e);
        })}
      </>
    </Box>
  );
};

export default Post;