import type { ErrorRequestHandler } from "express";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  log.error(err);
  console.error("error: ", err);
  console.error("error.stack: ", err.stack);
  console.dir(err, { depth: null });

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
