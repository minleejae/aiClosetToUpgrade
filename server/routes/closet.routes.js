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
        const {email, type, postType} = req.body;
        const authData = await User.findOne({email});
        // console.log("--------------------\n\n\n", req.body, "\n2.\n", type,"\n3\n", email,"\n4\n", postType);
        await Post.create({
            postType: postType,
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
