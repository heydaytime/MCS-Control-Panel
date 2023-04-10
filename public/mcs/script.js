const socket = io("/");

const btnStart = document.getElementById("start");
const btnStop = document.getElementById("stop");
const btnClearTerminal = document.getElementById("clear");
// const btnDarkMode = document.getElementById("dark-mode");
const ramOptions = document.getElementById("ram");

const svgOnline = document.getElementById("online");
const svgOffline = document.getElementById("offline");

const divOutput = document.getElementById("output");
const divTerminal = document.getElementsByClassName("terminal")[0];

const divRamAllocation = document.getElementById("ram-allocation");
const divRamStatus = document.getElementById("ram-status");

const ping = document.getElementById("ping");

const r = document.querySelector(":root");

btnStart.onclick = () => {
  socket.emit("start", ramOptions.value);
  btnStart.disabled = true;
  btnStop.disabled = false;
};
btnStop.onclick = () => {
  socket.emit("stop");
  btnStart.disabled = false;
  btnStop.disabled = true;
  divRamStatus.innerText = "";
};

btnClearTerminal.onclick = () => {
  divOutput.innerHTML = "";
};

socket.on("currentStatus", (isMCSOnline, currentStatus) => {
  if (isMCSOnline) {
    svgOffline.setAttribute("style", "display: none;");
    svgOnline.removeAttribute("style");
  } else {
    svgOnline.setAttribute("style", "display: none;");
    svgOffline.removeAttribute("style");
  }
  if (currentStatus) {
    currentStatus.forEach((data) => {
      outputData(data);
    });
    divTerminal.scrollTop = divTerminal.scrollHeight;
  }
});

socket.on("out", (data) => {
  outputData(data);
  divTerminal.scrollTop = divTerminal.scrollHeight;
});

socket.on("newRamAllocation", (ramAllocated) => {
  divRamAllocation.innerText = `RAM Allocation is set at ${ramAllocated}G`;
});

const maxRam = 16577642496; // hard coded max ram value!!! can't help it really.
socket.on("ram-free", (ramFree) => {
  console.log(ramFree);
  divRamStatus.innerText = `, currently using ${(
    (maxRam - ramFree) /
    10 ** 9
  ).toFixed(2)}G/${(maxRam / 10 ** 9).toFixed(2)}G`;
});

let rightThen = Date.now();
setInterval(() => {
  rightThen = Date.now();
  socket.emit("ping-server");
}, 2500);

socket.on("ping-client", () => {
  ping.innerText = Date.now() - rightThen;
});

const outputData = (data) => {
  const p = document.createElement("p");
  const text = document.createTextNode(data);
  divOutput.appendChild(text);
  divOutput.appendChild(p);
};
