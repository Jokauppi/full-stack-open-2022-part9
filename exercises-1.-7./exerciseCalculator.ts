import { areNumbers } from "./utils";

const Ratings = {
  1: "Failed",
  2: "Good enough",
  3: "Success",
} as const;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: keyof typeof Ratings;
  ratingDescription: (typeof Ratings)[keyof typeof Ratings];
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const average = hours.reduce((time, acc) => acc + time, 0) / hours.length;
  const rating = average / target < 0.5 ? 1 : average / target < 1 ? 2 : 3;

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((time) => time).length,
    success: average >= target,
    rating: rating,
    ratingDescription: Ratings[rating],
    target,
    average,
  };
};

const [_0, _1, target, ...hours] = process.argv;

if (!areNumbers([target, ...hours])) {
  console.log("Invalid input");
  process.exit(0);
}

console.dir(
  calculateExercises(
    hours.map((time) => Number(time)),
    Number(target)
  )
);
