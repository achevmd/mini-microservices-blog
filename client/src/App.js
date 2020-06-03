import React from 'react';
import './styles/App.scss';

import CreatePost from './components/CreatePost';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <CreatePost />
      <PostList />
    </div>
  );
}

export default App;
