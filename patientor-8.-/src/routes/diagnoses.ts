import express from "express";
import data from "../data/diagnoses";

const diagnosesRouter = express.Router();

diagnosesRouter.get("/", (_req, res) => {
  res.json(data);
});

export default diagnosesRouter;
