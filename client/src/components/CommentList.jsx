import React from 'react';

export default ({ comments }) => {
  const renderedComments = comments.map((comment, index) => (
    <div key={comment.id} className="comment">
      {index + 1}. {comment.status === 'pending' && <code>Comment moderation pending</code>}
      {comment.status === 'rejected' && <code>Comment rejected</code>}
      {comment.status === 'approved' && comment.content}
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
