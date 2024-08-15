import express from "express";
import {
  addPost,
  editPost,
  getPost,
  deletePost,
  getPostsList,
} from "../controllers/post.js";
import { addComment, deleteComment } from "../controllers/comment.js";
import { authenticated } from "../middlewares/authenticated.js";
import { checkHasRole } from "../middlewares/hasRole.js";
import { mapPost } from "../helpers/mapPost.js";
import { mapComment } from "../helpers/mapComment.js";
import * as ROLES from "../constants/roles.js";

export const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPostsList(
    req.query.search,
    req.query.page,
    req.query.limit
  );

  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

router.post("/:id/comments", authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/:postId/comments/:commentId",
  authenticated,
  checkHasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.send({ error: null });
  }
);

router.post(
  "/",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newPost = await addPost({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    });

    res.send({ data: mapPost(newPost) });
  }
);

router.patch(
  "/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedPost = await editPost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      image: req.body.imageUrl,
    });

    res.send({ data: mapPost(updatedPost) });
  }
);

router.delete(
  "/:id",
  authenticated,
  checkHasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);

    res.send({ error: null });
  }
);
