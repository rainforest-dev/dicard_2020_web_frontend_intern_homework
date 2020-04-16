import React from 'react';
import { Card, Heading, Text } from 'rebass';

const DcardListTile = ({post, ...rest}) => {

  return (
    <Card
      sx={{
        p: 3,
        cursor: 'pointer'
      }}
      {...rest}
    >
      <Heading py={3} color='rgba(0, 0, 0, 0.95)' fontWeight='600'>{post.title}</Heading>
      <Text color='rgba(0, 0, 0, 0.6)'>{post.excerpt}</Text>
    </Card>
  );
}

export default DcardListTile;