/********** APP **********/

import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import __dirname from "./dirname.js";

import indexRouter from "./routes/index.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

/* Express */
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(`${__dirname}/public`));

/* Morgan */
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Servitec API running 🚀",
  });
});

/* Routes */
app.use(indexRouter);

app.use(errorHandler);

export default app;
