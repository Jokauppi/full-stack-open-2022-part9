const calculateBmi = (height: number, weight: number): string => {
    
    const bmi: number = weight / Math.pow(height / 100, 2);

    if (bmi >= 40) return "Obese (class III)";
    else if (bmi >= 35) return "Obese (class II)";
    else if (bmi >= 30) return "Obese (class I)";
    else if (bmi >= 25) return "Overweight (pre-obese)";
    else if (bmi >= 18.5) return "Normal (healthy weight)";
    else if (bmi >= 17) return "Underweight (mild thinness)";
    else if (bmi >= 16) return "Underweight (moderate thinness)";
    else return "Underweight (severe thinness)";
}

console.log(calculateBmi(170, 65));
console.log(calculateBmi(180, 74));