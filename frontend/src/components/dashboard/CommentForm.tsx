import React, { useState } from 'react';

interface CommentFormProps {
  onSubmit: (body: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(body);
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
