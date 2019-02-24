import { RequestHandler, Request } from "express";

export const validate: (
  check: (req: Request) => boolean,
  error: string
) => RequestHandler = (check, error) => (req, res, next) => {
  if (check(req)) {
    next();
  } else {
    res.status(400).json({ error });
  }
};
