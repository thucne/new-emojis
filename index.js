import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import favicon from "serve-favicon";

import routes from "./api/index.js";

dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "150mb" }));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
})


app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
