import { Request, Response } from 'express';
import CommentModel from '../../models/comment.model';
import jwt, { JwtPayload } from "jsonwebtoken"

// Add a new comment
export const addComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Token required!" });
    }
    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    const newComment = new CommentModel({ poster_id: _id, body: content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
