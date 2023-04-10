import express from "express";
import morgan from "morgan";
import favicon from "serve-favicon";
import cookieParser from "cookie-parser";

import api from "./routes/api.js";

const app = express();
app.use(express.json());

// Developer Logger
if (global.isInProdcution) app.use(morgan("dev"));

// Never need to handle favicons again!
app.use(favicon("./public/images/favicon.ico"));

// Restricted SubDirectories!!!
app.get("/*", (req, res, next) => {
  const [, clientUrl] = req.url.split("/");

  const restrictedUrls = ["images", "err"];
  for (const url of restrictedUrls) {
    if (clientUrl == `${url}`) {
      res.status(403).sendFile("./public/err/403.html", { root: __dirname });
      return;
    }
  }
  next();
});

app.use(express.static(`./public`));
app.use("/api/v1", api);

// Page not found!
app.use((req, res) => {
  res.status(404).sendFile("./public/err/404.html", { root: __dirname });
});

export default app;
