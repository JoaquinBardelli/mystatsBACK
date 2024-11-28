import path from "path";
import dotenv from "dotenv";
import { parse } from "ts-command-line-args";

// **** Types **** //

interface IArgs {
  env: string;
}

// **** Setup **** //

// Command line arguments
const args = parse<IArgs>({
  env: {
    type: String,
    defaultValue: process.env.NODE_ENV || "development",
    alias: "e",
  },
});

// Set the env file
const result2 = dotenv.config({
  path: path.join(__dirname, `../env/${args.env}.env`),
});
if (result2.error) {
  throw result2.error;
}

import logger from "jet-logger";

import EnvVars from "@src/common/EnvVars";
import server from "@src/server";

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
