import express from 'express';

//validators
const router = express.Router();

import { loadFile, getRandomEmojiPNG, getRandomEmoji, getAllEmoji } from "../controllers/emoji.js";

router.get("/", loadFile, getRandomEmojiPNG);
router.get("/json", loadFile, getRandomEmoji);
router.get("/all", loadFile, getAllEmoji);

export default router;