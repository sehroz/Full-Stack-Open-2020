// interface MultiplyValues {
//   value1: number;
//   value2: number;
// }

// const parseArguments = (args: Array<string>): MultiplyValues => {
//   if (args.length < 1) throw new Error("Not enough");
//   if (args.length > 4) throw new Error("Too many");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       value1: Number(args[2]),
//       value2: Number(args[3]),
//     };
//   } else {
//     throw new Error("Provide numbers!");
//   }
// };

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / (height / 100) ** 2;

  if (bmi <= 15) {
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

export = calculateBmi;
