import mongoose from "mongoose"
import shortId from "./type/shortId.js"

const PostSchema = new mongoose.Schema({
    shortId,
    title: String,
    content: String,
    like_count: Number,
    dislike_count: Number,
    price: Number, //당마용
    // 옷장:1, OOTD:2, 당근마켓:3 
    postType: {
        type: Number,
        required: true
    },
    // url: 이미지 주소, category: [top, bottom, shoes]
    img: {
        url: {
            type: String,
            required: true
        },
        category: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Upment",
    }],
}, {
    timestamps: true
}
);

export default PostSchema;