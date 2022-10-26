import cors from "cors";
import express from "express";
import fileUpLoad from "express-fileupload";
import path from "path";
import "express-async-errors";

import { logger } from "./lib/logger";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { morganMiddleWare } from "./middlewares/morganMiddleWare";
import { router } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(morganMiddleWare);

app.use(
  fileUpLoad({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "./tmp/"),
  })
);

app.use(router);

app.use(errorMiddleware);

process.on("exit", (code) => {
  return logger.info(`Server SPB Admin to exit with code ${code}`);
});

app.listen(port, () => {
  logger.info(
    `Server SPB Admin running in mode ${
      process.env.NODE_ENV || "development"
    }...`
  );
});
