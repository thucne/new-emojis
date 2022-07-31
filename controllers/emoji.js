import fs from "fs";

import path from "path";
const __dirname = path.resolve();

export const loadFile = async (req, res, next) => {
    fs.readFile(__dirname + "/public/data.json", "utf8", function (err, data) {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: "Oops some errors occured. Please try again later.",
            });
        }
        req.emoji = JSON.parse(data);
        next();
    });
};

const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomEmoji = async (req, res) => {
    const { emoji } = req;
    const { q, limit } = req.query;

    let shuffled = emoji.sort(() => 0.5 - Math.random());

    if (shuffled) {
        if (!limit) {
            if (q && q.length > 0) {
                shuffled = shuffled.filter((item) => {
                    const a = JSON.stringify(item).toLowerCase();
                    return a.includes(q);
                });
                let selected = shuffled.slice(0, 1);
                return res.status(200).json(selected);
            } else {
                let selected = shuffled.slice(0, 1);
                return res.status(200).json(selected);
            }
        } else {
            if (limit > 100) {
                if (q && q.length > 0) {
                    shuffled = shuffled.filter((item) => {
                        const a = JSON.stringify(item).toLowerCase();
                        return a.includes(q);
                    });
                    let selected = shuffled.slice(0, 100);
                    return res.status(200).json(selected);
                } else {
                    let selected = shuffled.slice(0, 100);
                    return res.status(200).json(selected);
                }
            } else {
                if (q && q.length > 0) {
                    shuffled = shuffled.filter((item) => {
                        const a = JSON.stringify(item).toLowerCase();
                        return a.includes(q);
                    });
                    let selected = shuffled.slice(0, limit);
                    return res.status(200).json(selected);
                } else {
                    let selected = shuffled.slice(0, limit);
                    return res.status(200).json(selected);
                }
            }
        }
    } else {
        return res
            .status(400)
            .json({ error: "Oops some errors occured. Please try again later." });
    }
};

export const getAllEmoji = async (req, res) => {
    const { emoji } = req;
    const { q, limit } = req.query;

    let shuffled = emoji;

    if (shuffled) {
        if (!limit) {
            if (q && q.length > 0) {
                shuffled = shuffled.filter((item) => {
                    const a = JSON.stringify(item).toLowerCase();
                    return a.includes(q);
                });
                let selected = shuffled;
                return res.status(200).json(selected);
            } else {
                let selected = shuffled;
                return res.status(200).json(selected);
            }
        } else {
            if (limit > 100) {
                if (q && q.length > 0) {
                    shuffled = shuffled.filter((item) => {
                        const a = JSON.stringify(item).toLowerCase();
                        return a.includes(q);
                    });
                    let selected = shuffled.slice(0, 100);
                    return res.status(200).json(selected);
                } else {
                    let selected = shuffled.slice(0, 100);
                    return res.status(200).json(selected);
                }
            } else {
                if (q && q.length > 0) {
                    shuffled = shuffled.filter((item) => {
                        const a = JSON.stringify(item).toLowerCase();
                        return a.includes(q);
                    });
                    let selected = shuffled.slice(0, limit);
                    return res.status(200).json(selected);
                } else {
                    let selected = shuffled.slice(0, limit);
                    return res.status(200).json(selected);
                }
            }
        }
    } else {
        return res
            .status(400)
            .json({ error: "Oops some errors occured. Please try again later." });
    }
};

export const getRandomEmojiPNG = async (req, res) => {
    fs.readFile(
        __dirname + "/public/data.json",
        "utf8",
        async function (err, data) {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    error: "Oops some errors occured. Please try again later.",
                });
            }
            const emoji = JSON.parse(data);
            let shuffled = emoji.sort(() => 0.5 - Math.random()).slice(0, 1);
            const url = shuffled[0].url;
            const b64 = await fetch(url)
                .then((response) => response.buffer())
                .then((buffer) => {
                    const b64 = buffer.toString("base64");
                    return b64;
                })
                .catch((err) => console.log(err));

            var img = Buffer.from(b64, "base64");

            res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": img.length,
            });
            res.end(img);
        }
    );
};
