import express from 'express';

//validators
const router = express.Router();

import { loadFile, getRandomEmoji, getAllEmoji, getRandomEmojiPNG } from "../controllers/emoji.js";

router.get("/", loadFile, getRandomEmoji);
router.post("/get", loadFile, getAllEmoji);
router.get("/get/png", getRandomEmojiPNG);

export default router;