import { Router } from 'express';
import { Post } from '../models/index.js'

export const path = '/search';
export const router = Router();

router.get("/", async (req, res, next) => {
    const postType = req.query.postType;
    try {
        let options = [];
        if(req.query.option == '제목'){
            options = [{ title: new RegExp(req.query.content) }];
          } else if(req.query.option == '내용'){
            options = [{ content: new RegExp(req.query.content) }];
          } else if(req.query.option == '제목 내용'){
            options = [{ title: new RegExp(req.query.content) }, { content: new RegExp(req.query.content) }];
          } else if(req.query.option == '작성자'){
            options = [{ author: new RegExp(req.query.content) }];
          } else {
            const err = new Error('검색 옵션이 없습니다.');
            err.status = 400;
            throw err;
          }

        const result = await Post.find({postType, show: true})
            .populate("author")
            .find({ $or: options });
        
        res.status(200).json({result});
    } catch (err) {
        next(err);
    }
});
