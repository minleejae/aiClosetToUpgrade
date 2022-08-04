import { Router } from 'express';
import multer from 'multer';
import { Post, User } from '../models/index.js';

export const path = '/posts';
export const router = Router();

router.get("/list", async (req, res, next) => {
    // postType에 해당하는 데이터를 배열로 모두 가져온다.
    const posts = await Post.find({postType : 2}).populate("author");
    res.json(posts);
})