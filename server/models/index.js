import mongoose from "mongoose"
import PostSchema from "./schemas/post"
import UserSchema from "./schemas/user"

const Post = mongoose.model("Post", PostSchema)
const User = mongoose.model("User", UserSchema)

export default {Post, User}