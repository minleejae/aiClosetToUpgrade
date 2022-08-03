import mongoose from "mongoose"
import PostSchema from "./schemas/post"
import UserSchema from "./schemas/user"

export const Post = mongoose.model("Post", PostSchema)
export const User = mongoose.model("User", UserSchema)
