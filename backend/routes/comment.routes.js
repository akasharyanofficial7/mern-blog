import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
  getcomments,
} from "../controllers/comment.controllers.js";

// Route for creating a comment
router.post("/create", verifyToken, createComment);

// Route for fetching comments of a specific post (should be GET)
router.get("/getPostComment/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.get("/getcomments/:postId", getcomments);

export default router;
