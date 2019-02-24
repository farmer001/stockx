import express from "express";
import knex from "knex";
import path from "path";
import { makeRouter as makeTrueSizeRouter } from "./controllers/true-size";

// Establishes database connection.
// Note this should not be exported. Instead, dependent components
// should have the connection to database injected.
const connection = knex(
  require("../db/knexfile")[process.env.NODE_ENV || "development"]
);

const app = express();

app.use(express.static(path.resolve(__dirname, "..", "static")));

app.get("/", (_, res) => res.sendFile("./index.html"));
app.use("/true-size", makeTrueSizeRouter(connection));

export default app;
