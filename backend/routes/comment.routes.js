import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controllers.js";

// Route for creating a comment
router.post("/create", verifyToken, createComment);

// Route for fetching comments of a specific post (should be GET)
router.get("/getPostComment/:postId", getPostComments);

export default router;
