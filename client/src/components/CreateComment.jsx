import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createComment = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
        content,
      });
      setContent('');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="create-comment-container">
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        inputMode="text"
        placeholder="New comment"
      />
      <button disabled={isLoading} className="button" onClick={createComment}>
        Post
      </button>
    </div>
  );
};
