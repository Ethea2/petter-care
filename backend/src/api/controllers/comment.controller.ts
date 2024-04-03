import { Request, Response } from 'express';
import CommentModel from '../../models/comment.model';
import jwt, { JwtPayload } from "jsonwebtoken"
import PostModel from '../../models/post.model';

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, post_id } = req.body;
    const { authorization } = req.headers;
    
    if (!authorization) {
      return res.status(401).json({ message: "Token required!" });
    }

    const token = authorization.split(" ")[1];
    const { _id } = jwt.verify(token, process.env.SECRET!) as JwtPayload;

    const newComment = new CommentModel({ poster_id: _id, body: content });
    await newComment.save();

    const post = await PostModel.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
