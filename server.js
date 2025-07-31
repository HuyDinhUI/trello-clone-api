import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CONNECT_DB } from "./src/config/mongodb.js";
import "dotenv/config";
import {APIs_v1} from './src/routes/v1/index.js'
import { corsOptions } from "./src/config/corsOptions.js";
import passport from "passport";
import "./src/config/auth/passport.js"
import fs from "fs";
import https from "https";

const app = express();

const START_SERVER = () => {
  app.use(express.json());
  
  
  app.use(passport.initialize());

  
  app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

  
  app.use(cookieParser());

  app.use(cors(corsOptions));

  app.use("/v1", APIs_v1);


  app.get("/", async (req, res) => {
    res.send("Server is running");
  });
  const PORT = process.env.PORT;

  const httpsOptions = {
    key: fs.readFileSync("./localhost+1-key.pem"),
    cert: fs.readFileSync("./localhost+1.pem"),
  };

  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`✅ HTTPS Server is running at https://localhost:${PORT}`);
  });
};

CONNECT_DB()
  .then(() => console.log("Connected to MongoDB"))
  .then(START_SERVER())
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
