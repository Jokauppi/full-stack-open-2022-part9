import express from "express";

const pingRouter = express.Router();

pingRouter.get("/ping", (_req, res) => {
  res.send("pong");
});

export default pingRouter;
