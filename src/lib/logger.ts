// import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
// import { PrismaWinstonTransporter } from "winston-prisma-transporter";

// const prisma = new PrismaClient();

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
  silly: 5,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const log_level = process.env.LOG_LEVEL || "http";
  const isDevelopment = env === "development";
  return isDevelopment ? log_level : "info";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "pink",
  silly: "white",
};

winston.addColors(colors);

const formatConsole = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} ${info.message} `
  )
);

const formatFile = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.json()
);

const formatDB = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.json()
);

const fileRotateTransportAll: DailyRotateFile = new DailyRotateFile({
  filename: "logs/spb-srv-admin-all-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: 5, // '15d'
  format: formatFile,
});

const fileRotateTransportError: DailyRotateFile = new DailyRotateFile({
  level: "error",
  filename: "logs/spb-srv-admin-error-%DATE%.log",
  datePattern: "YYYY-MM-DD-HH",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: 5, // '7d'
  format: formatFile,
});

const onNew = (filename: string) => {
  logger.info(`New file log Created! ${filename}`);
};

const onRotate = (oldFile: string, newFile: string) => {
  logger.info(`File is rotate: ${oldFile} new file created: ${newFile}`);
};

const onArquive = (zipFilename: string) => {
  logger.info(`File is archived: ${zipFilename}`);
};

const onRemove = (removedFile: string) => {
  logger.info(`File is deleted: ${removedFile}`);
};

fileRotateTransportAll.on("new", onNew);
fileRotateTransportAll.on("rotate", onRotate);
fileRotateTransportAll.on("archive", onArquive);
fileRotateTransportAll.on("logRemove", onRemove);

fileRotateTransportError.on("new", onNew);
fileRotateTransportError.on("rotate", onRotate);
fileRotateTransportError.on("archive", onArquive);
fileRotateTransportError.on("logRemove", onRemove);

const transports = [
  new winston.transports.Console({
    format: formatConsole,
  }),
  // new PrismaWinstonTransporter({
  //   level: "http",
  //   format: formatDB,
  //   prisma,
  //   tableName: "ServerLog",
  // }),
  // fileRotateTransportAll,
  // fileRotateTransportError,
];

export const logger = winston.createLogger({
  defaultMeta: {
    service: "spb-srv-admin",
  },
  level: level(),
  levels,
  transports,
});

export const sampleLogger = (_: Request, response: Response) => {
  logger.error("This is a error log");
  logger.warn("This is a warn log");
  logger.info("This is a info log");
  logger.http("This is a http log");
  logger.debug("This is a debug log");
  response.json({ message: "Test sample Logger Completed" });
};
