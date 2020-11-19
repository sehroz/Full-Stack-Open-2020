const calculateBmi = (height: number, mass: number): string => {
  let bmi = mass / ((height / 100) ^ 2);

  if (bmi === 15) {
    return "Very severely underweight";
  } else if (bmi < 16 && bmi > 15) {
    return "Severely underweight";
  } else if (bmi < 18.5 && bmi > 16) {
    return "Underweight";
  } else if (bmi < 25 && bmi > 18.5) {
    return "Normal (healthy weight)";
  } else if (bmi < 30 && bmi > 25) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

console.log(calculateBmi(180, 74));
