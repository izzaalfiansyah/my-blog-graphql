import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import cors from "cors";
import { createYoga } from "graphql-yoga";
import { schema } from "./utils/graphql";
import { yogaContext } from "./utils/yoga-context";
import { DB } from "./utils/data-source";

async function runApp() {
  const app = express();
  const port = process.env.PORT || 8000;
  const yoga = createYoga({
    schema: schema,
    maskedErrors: false,
    context: yogaContext,
  });

  await DB.initialize();

  app.use(cors());

  app.get("/", (req, res) => {
    res.send("It's work!");
  });

  app.use(yoga.graphqlEndpoint, yoga);

  const http = createServer(app);

  http.listen(port, () => {
    console.log("Application running on http://localhost:" + port);
  });
}

runApp();
