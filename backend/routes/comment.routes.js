import express from "express";
const router = express.Router();
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  getPostComments,
  likeComment,
  getcomments,
  deleteComment,
} from "../controllers/comment.controllers.js";

router.post("/create", verifyToken, createComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getPostComment/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.get("/getcomments", verifyToken, getcomments);

export default router;
