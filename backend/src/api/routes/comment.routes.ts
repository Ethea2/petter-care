import express from 'express';
import { addComment } from '../controllers/comment.controller';

const router = express.Router();

router.post('/add', addComment);

export default router;
