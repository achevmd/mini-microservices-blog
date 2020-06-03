import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ comments }) => {
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
