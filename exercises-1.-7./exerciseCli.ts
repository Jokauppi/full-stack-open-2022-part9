import { calculateExercises } from "./exerciseCalculator";
import { areNumbers } from "./utils";

const [target, ...hours] = process.argv.slice(2);

if (!areNumbers([target, ...hours])) {
  console.log("Invalid input");
  process.exit(0);
}

try {
  console.dir(
    calculateExercises(
      hours.map((time) => Number(time)),
      Number(target)
    )
  );
} catch {
  console.log("Something went wrong.");
}
