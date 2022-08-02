import { Schema } from "mongoose";
import shortId from "./type/shortId";

const UserSchema = new Schema({
    shortId,
    email: String,
    password: String,
    name: String,
    status: false
}, {
    timestamps: true
})

export default UserSchema;