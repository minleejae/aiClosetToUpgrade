import { Router } from 'express';
import multer from 'multer';
import { Post, User } from '../models/index.js'

export const path = '/closet';
export const router = Router();

const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'images/');
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}__${file.originalname}`);
        },
    });
const upload = multer({ storage: storage });


router.post('/create', upload.single('img'), async function (req, res, next) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file);
    if (req.file) {
        const { type } = req.body;
        const email = req.tokenInfo.email;
        const category = JSON.parse(type).dressType;
        const authData = await User.findOne({email});
        // console.log("--------------------\n\n\n", req.body, "\n2.\n", type,"\n3\n", email,"\n4\n", postType);
        await Post.create({
            postType: 1,
            img: {
                   url: req.file.path,
                   category: category
            },
            author: authData
        });
        res.json({ data: "이미지 업로드에 성공했습니다!"});
    } else {
        next(new Error("이미지 업로드에 실패하였습니다. 에러코드 추가필요"));
    }

 });

 // 옷 정보 불러오기
 router.get("/list", async (req, res, next) => {
    try {
        const email = req.tokenInfo.email;
        const posts = await Post.find({ postType: 1, email, show: true })
            .sort({ createdAt: -1 }) //마지막으로 작성된 게시글을 첫번째 인덱스로 가져옴
            .populate("author");
    
        res.json({ posts });
    } catch(err) {
        err.message = `${err.message}, closet list error.`;
        next(err);
    }

});

//옷정보 삭제
router.delete("/delete/:shortId", async (req, res, next) => {
    const tokenInfo = req.tokenInfo;
    const shortId = req.params.shortId;
    try {
        if (!tokenInfo) {
            return next(new Error("로그인을 해주세요."));
        }
        const postUserId = await Post.findOne({ shortId }).populate('author');
        if (tokenInfo.email !== postUserId.author.email) {
            return next(new Error("작성자가 아닙니다!"));
        }
        
        await Post.updateOne({ shortId }, { show: false });
        
        res.json({ message: "삭제하였습니다." });
    } catch(err) {
        err.message = `${err.message}, closet delete error.`;
        next(err);
    }

});
