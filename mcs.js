import { spawn } from "child_process";
import os from "os";
import { setInterval } from "timers";

let ramAllocated = 3;
let currentStatus = [];
let isMCSOnline = false;
let MCS_PID = -100;

const { MCS_MIN_RAM_ALLOCATION, MCS_MAX_RAM_ALLOCATION } = process.env;

const mcsSocket = (io) => {
  io.on("connection", (socket) => {
    socket.join("status");
    socket.emit("currentStatus", isMCSOnline, currentStatus);
    socket.emit("newRamAllocation", ramAllocated);

    socket.on("start", (ram) => {
      if (!isMCSOnline) {
        ramAllocated =
          ram >= MCS_MIN_RAM_ALLOCATION && ram <= MCS_MAX_RAM_ALLOCATION
            ? ram
            : ramAllocated;

        io.emit("newRamAllocation", ramAllocated);

        const child = spawn(
          "java",
          [
            `-Xmx${ramAllocated}G`,
            `-Xms${ramAllocated}G`,
            "-jar",
            "fabric-server-launcher.jar",
            "nogui",
          ],
          { cwd: "./mcs_server_files/medieval" }
        );

        child.stdout.on("data", (chunk) => {
          io.to("status").emit("out", chunk.toString());
          currentStatus.push(chunk.toString());
        });

        MCS_PID = child.pid;

        isMCSOnline = true;
        io.emit("currentStatus", isMCSOnline);
      }
    });
    socket.on("stop", () => {
      if (isMCSOnline) {
        spawn("sudo", ["kill", "-2", MCS_PID]).on("close", () => {
          currentStatus = [];
        });
        MCS_PID = -100;
        isMCSOnline = false;

        io.emit("currentStatus", isMCSOnline);
      }
    });

    socket.on("ping-server", () => {
      socket.emit("ping-client");
    });
  });

  setInterval(() => {
    io.emit("ram-free", os.freemem());
  }, 1000);
};

export default mcsSocket;
