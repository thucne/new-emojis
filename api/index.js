import express from 'express';

//validators
const router = express.Router();

import { getRandomEmojiPNG, getRandomEmoji, getAllEmoji } from "../controllers/emoji.js";

router.get("/", getRandomEmojiPNG);
router.get("/json", getRandomEmoji);
router.get("/all", getAllEmoji);

export default router;