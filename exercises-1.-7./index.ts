import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { areNumbers } from "./utils";

const app = express();

app.use(express.json());

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

app.post("/exercises", (req, res) => {
  console.dir(req);

  const { daily_exercises, target } = req.body as {
    daily_exercises: number[];
    target: number;
  };

  if (daily_exercises === undefined || target === undefined)
    res.status(400).json({
      error: "parameters missing",
    });

  if (!areNumbers([...daily_exercises, target]))
    res.status(400).json({
      error: "malformatted parameters",
    });

  res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT);
