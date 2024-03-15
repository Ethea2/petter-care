import React from 'react';
import { IComment } from '../../../../backend/src/types/comment.types'; 

interface CommentProps {
  comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.body}</p>
      <p>Poster ID: {comment.poster_id}</p>
      <p>Upvotes: {comment.upvotes.length}</p>
    </div>
  );
};

export default Comment;
