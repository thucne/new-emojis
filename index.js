import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import favicon from "serve-favicon";

import routes from "./api/index.js";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: `http://localhost:3000` }));
} else {
    app.use(
        cors({
            origin: [
                /trantrongthuc\.com$/,
                /thuc\.tech$/,
            ],
        })
    );
}


app.use(morgan("dev"));
app.use(express.json({ limit: "150mb" }));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
})


app.use("/", routes);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`Database connected`);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(`Error in connecting MongoDB: ${err.message}`);
    });
