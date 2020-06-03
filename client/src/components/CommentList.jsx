import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [comments, setComments] = useState([]);

  // Fetch comments
  useEffect(() => {
    axios
      .get(`http://localhost:4001/posts/${postId}/comments`)
      .then((res) => setComments(res.data));
  }, [postId]);

  const renderedComments = comments.map((comment) => (
    <div key={comment.id} className="comment">
      {comment.content}
    </div>
  ));

  if (comments.length)
    return (
      <div className="container">
        <h5>Comments: </h5>
        <div className="comment-list">{renderedComments}</div>
      </div>
    );

  return null;
};
