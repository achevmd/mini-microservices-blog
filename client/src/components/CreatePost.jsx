import React, { useState } from 'react';
import axios from 'axios';

export default (props) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:4000/posts', {
        title,
      });
      setTitle('');
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="create-post-container">
      <h3>Create post</h3>
      <div className="flex">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          inputMode="text"
          placeholder="Post title"
        />
        <button disabled={isLoading} className="button" onClick={createPost}>
          Create
        </button>
      </div>
    </div>
  );
};
