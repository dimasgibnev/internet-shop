import { PostModel } from "../models/Post.js";

export const addPost = async (post) => {
  const newPost = await PostModel.create(post);

  await newPost.populate({ path: "comments", populate: "author" });

  return newPost;
};

export const editPost = async (id, post) => {
  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  });

  await updatedPost.populate({ path: "comments", populate: "author" });

  return updatedPost;
};

export const deletePost = (id) => {
  return PostModel.findByIdAndDelete(id);
};

export const getPostsList = async (search = "", page = 1, limit = 10) => {
  const [posts, count] = await Promise.all([
    PostModel.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    PostModel.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
};

export const getPost = (id) => {
  return PostModel.findById(id).populate({
    path: "comments",
    populate: "author",
  });
};
