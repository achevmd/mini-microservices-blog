import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.scss';

export default (props) => {
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createPost = async () => {
        console.log('creating post with title: ', title);
        // setIsLoading(true);
        // setTimeout(() => setIsLoading(false), 1000);
        const res = await axios.post('http://localhost:4000/post', {
            title,
        });
        console.log(res);
        setTitle('');
    };

    return (
        <div className="create-post-container">
            <h3>Create post</h3>
            {!isLoading && <div className="flex">
                <input value={title} onChange={e => setTitle(e.target.value)} inputMode="text" placeholder="Post title" />
                <button disabled={isLoading} className="button" onClick={createPost}>Create</button>
            </div>}
        </div>
    );
};