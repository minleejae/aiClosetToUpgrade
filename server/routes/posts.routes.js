import { Router } from 'express';
import multer from 'multer';
import { Post, User } from '../models/index.js';

export const path = '/posts';
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


router.get("/list", async (req, res, next) => {
    // postType에 해당하는 데이터를 배열로 모두 가져온다.
    // const posts = await Post.find({postType : 2}).populate("author");
    // res.json(posts);

    try {
        const page = Number(req.query.page);
        const perPage = Number(req.query.perPage);

        const posts = await Post.find({ postType: 2 })
        .sort({ createdAt: -1 }) 
        .skip(perPage * (page - 1)) 
        .limit(perPage)
        .populate("author");

        // const total = await Post.countDocuments({postType: 3});
        // const totalPage = Math.ceil(total / perPage); 

        res.json({ posts });
    } catch(err) {
        err.message = `${err.message}, posts list error.`;
        next(err);
    }
})

router.post('/create', upload.single('img'), async function (req, res, next) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file);
    if (req.file) {
        const {email, content, title} = req.body;
        const authData = await User.findOne({email});
        console.log("--------------------\n\n\n", req.body, "\n2.\n", title, "\n4\n", content);
        await Post.create({
            title: title,
            content: content,
            postType: 2,
            img: {
                url: req.file.path,
            },
            author: authData
        });
        res.json({ data: "게시물 업로드에 성공했습니다!"});
    } else {
        next(new Error("게시물 업로드에 실패하였습니다."));
    }

 });
