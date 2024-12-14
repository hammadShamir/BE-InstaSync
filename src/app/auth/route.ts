import express from "express";
import * as auth from "./controller";
import { asyncHandler } from "../../middleware/asyncHandler";

const router = express.Router();
router.post("/auth/sign-up", asyncHandler(auth.signUp));
router.post("/auth/sign-in", asyncHandler(auth.signIn));

export default router;
