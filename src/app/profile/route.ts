import express from "express";
import * as profile from "./controller";
import { asyncHandler } from "../../middleware/asyncHandler";
import { authMiddleware } from "../../middleware/auth";

const router = express.Router();
router.put("/profile", authMiddleware, asyncHandler(profile.UpdateProfile));
router.get(
  "/profile/posts",
  authMiddleware,
  asyncHandler(profile.getProfilePost)
);
router.post(
  "/profile/post",
  authMiddleware,
  asyncHandler(profile.addProfilePost)
);

export default router;
