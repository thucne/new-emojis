import express from 'express';

//validators
const router = express.Router();

import { loadFile, getRandomEmojiPNG } from "../controllers/emoji.js";

router.get("/", loadFile, getRandomEmojiPNG);

export default router;