import { Request, Response } from 'express';
import CommentModel from '../../models/comment.model';

// Add a new comment
export const addComment = async (req: Request, res: Response) => {
  try {
    const { poster_id, body } = req.body;
    const newComment = new CommentModel({ poster_id, body });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
