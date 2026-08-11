/********** SERVER **********/

import app from "./app.js";
import config from "./config/config.js";
import getLogger from "./utils/logger.utils.js";
import { connectDB } from "./config/mongoConnection.js";

const log = getLogger();
const port = config.server.port;

/* Start Server */
const startServer = async () => {
  try {
    // await connectDB();
    log.warn("Conexión a Base de Datos inexistente!!!");

    app.listen(port, () => {
      log.info(
        `Server running on port ${port}, in ${config.environment.env} mode.`,
      );
    });
  } catch (error) {
    log.fatal(`*** CONNECTION STARTUP ERROR ***: , ${error.message}`);
    process.exit(1);
  }
};

startServer();
