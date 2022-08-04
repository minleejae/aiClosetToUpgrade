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
        const {email, type} = req.body;
        const authData = await User.findOne({email});
        // console.log("--------------------\n\n\n", req.body, "\n2.\n", type,"\n3\n", email,"\n4\n", postType);
        await Post.create({
            postType: 1,
            img: {
                   url: req.file.path,
                   category: type.dressType,
            },
            author: authData
        });
        res.json({ data: "이미지 업로드에 성공했습니다!"});
    } else {
        next(new Error("이미지 업로드에 실패하였습니다. 에러코드 추가필요"));
    }

 });

 router.get("/list", async (req, res, next) => {
    try {
        const page = Number(req.query.page);
        const perPage = Number(req.query.perPage);
    
        const posts = await Post.find({ postType: 1 })
        .sort({ createdAt: -1 }) //마지막으로 작성된 게시글을 첫번째 인덱스로 가져옴
        .skip(perPage * (page - 1)) //ex> 2페이지라면 5번부터
        .limit(perPage) // 6개씩 가져와줘.
        .populate("User");
        
        // const total = await Post.countDocuments({postType: 3});
        // const totalPage = Math.ceil(total / perPage); 무한스크롤이기때문에 필요없을듯.
    
        res.json({ posts, totalPage });
    } catch(err) {
        err.message = `${err.message}, closet list error.`;
        next(err);
    }

});
