import mongoose from "mongoose";
import config from "./config.js";
import getLogger from "../utils/logger.utils.js";

const log = getLogger();

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  try {
    if (isConnected) {
      return;
    }

    if (!config.db.cs) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(config.db.cs, {
      dbName: config.db.dbName,
    });

    isConnected = true;
    log.info("Connected to MongoDB succesfully");
  } catch (error) {
    if (error instanceof Error) {
      log.fatal(`*** MongoDB connection error ***: ${error.message}`);
    } else {
      log.fatal("*** MongoDB connection error ***: Unknown error");
    }
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  log.warn("MongoDB disconnected");
});

mongoose.connection.on("error", (error) => {
  log.error(`*** MongoDB connection error ***: ${error.message}`);
});
