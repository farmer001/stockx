import express from "express";
import knex from "knex";
import path from "path";
import { makeRouter as makeTrueSizeRouter } from "./controllers/true-size";

const app = express();

const connection = knex(require("../db/knexfile")["development"]);

app.use(express.static(path.resolve(__dirname, "..", "static")));

app.get("/", (_, res) => res.sendFile("./index.html"));
app.use("/true-size", makeTrueSizeRouter(connection));

export default app;
