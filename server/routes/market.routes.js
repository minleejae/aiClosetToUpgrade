import { Router } from 'express';
import multer from 'multer';
import { Post, User } from '../models/index.js'

export const path = '/market';
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
        const {email} = req.body;
        const price = Number(req.body.price);
        const authData = await User.findOne({email});
        // console.log("--------------------\n\n\n", req.body, "\n2.\n", type,"\n3\n", email,"\n4\n", postType);
        await Post.create({
            postType: 3,
            price: price,
            img: {
                   url: req.file.path
            },
            author: authData
        });
        res.json({ data: "게시글 업로드에 성공했습니다!"});
    } else {
        next(new Error("게시글 업로드에 실패하였습니다. 에러코드 추가필요"));
    }

 });

 
router.get("/list", async (req, res, next) => {
    try {
        const page = Number(req.query.page);
        const perPage = Number(req.query.perPage);
    
        const posts = await Post.find({ postType: 3 })
        .sort({ createdAt: -1 }) //마지막으로 작성된 게시글을 첫번째 인덱스로 가져옴
        .skip(perPage * (page - 1)) //ex> 2페이지라면 5번부터
        .limit(perPage) // 6개씩 가져와줘.
        .populate("author");
        
        // const total = await Post.countDocuments({postType: 3});
        // const totalPage = Math.ceil(total / perPage); 무한스크롤이기때문에 필요없을듯.
    
        res.json({ posts });
    } catch(err) {
        err.message = `${err.message}, market list error.`;
        next(err);
    }

});

router.get("/list/:shortId/find", async (req, res, next) => {
    let { shortId } = req.params;

    try {

        //shortId의 맞는 데이터를 가져옵니다. (title과 content를 가져옵니다)
        let data = await Post.findOne({ shortId });

        //가져온 데이터를 json형태로 응답합니다.
        res.json(data);

    } catch (err) {
        err.message = `${err.message}, market post find error.`;
        next(err);
    }

});

router.put("/list/:shortId/update", async (req, res, next) => {
    let { shortId } = req.params;
    let { title, content } = req.body;

    try {

       // shortId가 같은 데이터를 title, content를 update시켜줍니다.
       await Post.updateOne({ shortId }, {
            title,
            content
        });


        //만약 업데이트가 완료가 되면 json형태의 데이터를 응답해줍니다.
        res.json({
            result: "수정이 완료되었습니다."
        })

    } catch (err) {
        err.message = `${err.message}, market post find error.`;
        next(err);
    }

});

router.put("/list/:shortId/update", async (req, res, next) => {
    let { shortId } = req.params;
    let { title, content } = req.body;

    try {

       // shortId가 같은 데이터를 title, content를 update시켜줍니다.
       await Post.updateOne({ shortId }, {
            title,
            content
        });


        //만약 업데이트가 완료가 되면 json형태의 데이터를 응답해줍니다.
        res.json({
            result: "수정이 완료되었습니다."
        })

    } catch (err) {
        err.message = `${err.message}, market post find error.`;
        next(err);
    }

});

router.get("/list/:shortId/delete", async (req, res, next) => {

    //shortId를 파라미터를 통해 가져옵니다.
    const { shortId } = req.params;

    try {
        //shortId에 해당하는 document를 삭제합니다.
        await Post.deleteOne({ shortId });

        //만약 오류가 나지 않고 삭제를 완료했다면, json형태를 응답해줍니다.
        res.json({
            result: '삭제가 완료 되었습니다.'
        })

    } catch (err) {
        err.message = `${err.message}, market post find error.`;
        next(err);
    }
});