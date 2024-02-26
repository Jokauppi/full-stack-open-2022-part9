import { calculateBmi } from "./bmiCalculator";
import { areNumbers } from "./utils";

const [height, mass] = process.argv.slice(2);

if (!areNumbers([height, mass])) {
  console.log("Invalid input");
  process.exit(0);
}

try {
  console.log(calculateBmi(Number(height), Number(mass)));
} catch {
  console.log("something went wrong");
}
