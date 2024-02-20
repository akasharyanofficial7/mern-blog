import express from "express";
const router = express.Router();
import { test } from "../controllers/user.controllers.js";

router.get("/test", test);

export default router;
