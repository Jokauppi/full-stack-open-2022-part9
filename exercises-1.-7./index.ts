import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { areNumbers } from "./utils";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!areNumbers([height, weight]))
    res.status(400).json({
      error: "malformatted parameters",
    });

  res.json({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

const PORT = 3003;

app.listen(PORT);
