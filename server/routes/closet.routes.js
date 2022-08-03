import { Router } from 'express';
import multer from 'multer';

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
        // await Posts.create({
        //     shortId,
        //     type: req.body.boardType,
        //     img: {
        //            url: req.file.filename,
        //            type: req.body.type,
        //     }
        // });
        res.json({ data: "이미지 업로드에 성공했습니다!"});
    } else {
        next(new Error("이미지 업로드에 실패하였습니다. 에러코드 추가필요"));
    }

 });
