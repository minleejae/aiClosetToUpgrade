import { Router } from 'express';
import { Dislike, Downment, Like, Post, Upment, User } from '../models/index.js'

export const path = '/like';
export const router = Router();

//좋아요 가져오기
router.get("/getlikes", async (req, res, next) => {

    try {
        let postData = null;
        let upmentData = null;
        let downmentData = null;
        if (req.query.postId) {
            const postId = req.query.postId;
            postData = await Post.findOne({postId});
        } else if (req.query.upmentId) { 
            const upmentId = req.body.upmentId
            upmentData = await Upment.findOne({upmentId});
        } else { 
            const downmentId = req.query.downmentId
            downmentData = await Downment.findOne({downmentId});
        }    
       
    
        const likes = await Like.find({ 
            postId: postData,
            upmentId: upmentData,
            downmentId: downmentData
        });

        res.status(200).json(likes);
    } catch (err) {
        err.message = `${err.message}, get like error.`;
        next(err);
    }
});

//싫어요 가져오기
router.get("/getdislikes", async (req, res, next) => {
    try {

        let postData = null;
        let upmentData = null;
        let downmentData = null;
        if (req.query.postId) {
            const postId = req.query.postId;
            postData = await Post.findOne({postId});
        } else if (req.query.upmentId) { 
            const upmentId = req.body.upmentId
            upmentData = await Upment.findOne({upmentId});
        } else { 
            const downmentId = req.query.downmentId
            downmentData = await Downment.findOne({downmentId});
        }    
       
    
        const dislikes = await Dislike.find({ 
            postId: postData,
            upmentId: upmentData,
            downmentId: downmentData
        });

        res.status(200).json(dislikes);
    } catch (err) {
        err.message = `${err.message}, get dislike error.`;
        next(err);
    }
});

//좋아요 누르기
router.post("/uplike", async (req, res, next) => {
    const email = req.tokenInfo.email;
    try {
        
        const userData = await User.findOne({email});
        let postData = null;
        let upmentData = null;
        let downmentData = null;
        if (req.body.postId) {
            const postId = req.body.postId;
            postData = await Post.findOne({postId});
        } else if (req.body.upmentId) { 
            const upmentId = req.body.upmentId
            upmentData = await Upment.findOne({upmentId});
        } else { 
            const downmentId = req.body.downmentId
            downmentData = await Downment.findOne({downmentId});
        }
        
        const liked = await Like.findOne({
            userId: userData,
            postId: postData,
            upmentId: upmentData,
            downmentId: downmentData 
        });
        const disliked = await Dislike.findOne({
            userId: userData,
            postId: postData,
            upmentId: upmentData,
            downmentId: downmentData 
        });

        if (liked) {
            await Like.findOneAndDelete(
                liked._id
            );
            return res.status(200).json({ liked: false, disliked: false});
        } else if (disliked) {
            await Dislike.findOneAndDelete(
                disliked._id
            );
            await Like.create({
                userId: userData,
                postId: postData,
                upmentId: upmentData,
                downmentId: downmentData
            });
            return res.status(200).json({ liked: true, disliked: false });
        } else {
            await Like.create({
                userId: userData,
                postId: postData,
                upmentId: upmentData,
                downmentId: downmentData
            });
            return res.status(200).json({liked: true, disliked: false});
        }

        
    } catch (err) {
        err.message = `${err.message}, post like error.`;
        next(err);
    }
});

//싫어요 누르기
router.post("/updislike", async (req, res, next) => {
    const email = req.tokenInfo.email;

    try {

        const userData = await User.findOne({email});
        let postData = null;
        let upmentData = null;
        let downmentData = null;
        if (req.body.postId) {
            const postId = req.body.postId;
            postData = await Post.findOne({postId});
        } else if (req.body.upmentId) { 
            const upmentId = req.body.upmentId
            upmentData = await Upment.findOne({upmentId});
        } else { 
            const downmentId = req.body.downmentId
            downmentData = await Downment.findOne({downmentId});
        }
        
        const liked = await Like.findOne({
            userId: userData,
            postId: postData,
            upmentId: upmentData,
            downmentId: downmentData 
        });
        const disliked = await Dislike.findOne({
            userId: userData,
            postId: postData,
            upmentId: upmentData,
            downmentId: downmentData 
        });

        if (disliked) {
            await Dislike.findOneAndDelete(
                disliked._id
            );
            return res.status(200).json({ liked:false ,disliked: false });
        } else if (liked) {
            await Like.findOneAndDelete(
                liked._id
            );
            await Dislike.create({
                userId: userData,
                postId: postData,
                upmentId: upmentData,
                downmentId: downmentData
            });
            return res.status(200).json({ liked: false, disliked: true });
        } else {
            await Dislike.create({
                userId: userData,
                postId: postData,
                upmentId: upmentData,
                downmentId: downmentData
            });
            return res.status(200).json({ liked: false, disliked: true });
        }
       
    } catch (err) {
        err.message = `${err.message}, post dislike error.`;
        next(err);
    }
});