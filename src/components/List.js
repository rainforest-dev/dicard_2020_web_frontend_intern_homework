import React, { useState, useEffect } from 'react';

const List = ({items, itemBuilder, fetchMore}) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  })

  useEffect(() => {
    if (!isFetching) return;
    console.log(items)
    fetchMore(items);
    setIsFetching(false);
  }, [fetchMore, isFetching, items])

  const handleScroll = () => {
    if (Math.ceil(document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.scrollHeight) setIsFetching(true);
  };

  return (
    <div onScroll={handleScroll}>
      {
        items.map((item) => itemBuilder(item))
      }
      {isFetching && 'Fetching more posts...'}
    </div>
  );
};

export default List;