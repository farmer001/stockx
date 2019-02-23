import { Router } from "express";
import { validate } from "../utils/validate";
import { findAvgSizeByModelName } from "../db/findAvgSizeByModelName";
import { QueryInterface } from "knex";
import { isValidTrueToSizeValue } from "../utils";
import bodyParser from "body-parser";

/**
 * Returns Express router for handling true-to-size operations.
 * @param qi
 */
const makeRouter = (qi: QueryInterface) => {
  const router = Router();
  router.use(bodyParser.json());

  // Route to retrieve average true-to-size value for a given model name.
  router.get(
    "/:name",
    validate(req => req.params.name, "Name must be present."),
    async (req, res) => {
      const name: string = req.params.name.toLowerCase();
      findAvgSizeByModelName(qi, name).then(avgValue => {
        res.send({ name, avgValue });
      });
    }
  );

  // Route to persist a new true-to-size entry.
  router.post(
    "/",
    validate(req => req.body.name, "Name must be present."),
    validate(req => isValidTrueToSizeValue(req.body.size), "Invalid size."),
    async (req, res) => {
      const name: string = req.body.name.toLowerCase();
      const value: number = parseInt(req.body.size);

      try {
        await qi.insert({ name, value }).into("true_sizes");
        findAvgSizeByModelName(qi, name).then(avgValue => {
          res.send({ name, avgValue });
        });
      } catch (error) {
        res.status(500).end();
        return;
      }
    }
  );

  return router;
};

export { makeRouter };
