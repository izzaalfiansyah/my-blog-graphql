import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import cors from "cors";

async function runApp() {
  const app = express();
  const port = process.env.PORT || 8000;

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("It's work!");
  });

  const http = createServer(app);

  http.listen(port, () => {
    console.log("Application running on http://localhost:" + port);
  });
}

runApp();
