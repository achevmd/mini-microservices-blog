import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CreateComment';
import CommentList from './CommentList';

export default (props) => {
  const [posts, setPosts] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');
    setPosts(res.data);
  };

  const renderedPosts = Object.keys(posts).map((key) => (
    <div key={key} className="card">
      <h3>{posts[key].title}</h3>
      <CreateComment postId={key} />
      <CommentList postId={key} />
    </div>
  ));

  return (
    <div className="container">
      <h3>Posts</h3>
      <div className="post-list">{renderedPosts}</div>
    </div>
  );
};
