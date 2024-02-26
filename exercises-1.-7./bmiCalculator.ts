const messages: [number, string][] = [
  [16.0, "Underweight (Severe thinness)"],
  [17.0, "Underweight (Moderate thinness)"],
  [18.5, "Underweight (Mild thinness)"],
  [25.0, "Normal (Healthy Weight)"],
  [30.0, "Overweight (Pre-obese)"],
  [35.0, "Obese (Class I)"],
  [40.0, "Obese (Class II)"],
  [Infinity, "Obese (Class III)"],
];

export const calculateBmi = (height: number, mass: number) => {
  const bmi = mass / (height / 100) ** 2;

  for (const category of messages) {
    if (bmi < category[0]) return category[1];
  }

  throw Error();
};
