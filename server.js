import "./functions/dotenv.js";

import mongoose from "mongoose";
import { Server } from "socket.io";
import { dirname } from "path";
import { fileURLToPath } from "url";
global.__dirname = dirname(fileURLToPath(import.meta.url));
global.isInProduction = process.env.PRODUCTION;

import app from "./app.js";
import mcsSocket from "./mcs.js";

const PORT = process.env.PORT;
const DB = process.env.DB;

mongoose.connect(DB).then((con) => {
  console.log("Sucessfully connected to DB");
});

const server = app.listen(PORT, () => {
  console.log(`Server started running on port ${PORT}`);
});

const io = new Server(server);
mcsSocket(io);
