interface Values {
  vals: Array<number>;
}

const parseArgument = (args: Array<string>): Values => {
  if (args.length < 1) throw new Error("Not enough");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      vals: args.map(Number).slice(2, args.length),
    };
  } else {
    throw new Error("Provide numbers!");
  }
};

interface DataLabel {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const excerciseCalculator = (values: Array<number>): DataLabel => {
  let totalHours = values.reduce((a, b) => a + b, 0) - values[0];
  let days = values.filter((d) => d !== 0).length - 1;
  let rate =
    totalHours >= values[0] ? 3 : totalHours == values[0] * 0.5 ? 2 : 1;
  let results = {
    periodLength: values.length - 1,
    trainingDays: days,
    success: totalHours / values.length - 1 <= values[0] ? false : true,
    rating: rate,
    ratingDescription: rate === 3 ? "Perfect" : "Reengage",
    target: values[0],
    average: totalHours / (values.length - 1),
  };
  console.log(totalHours);
  console.log(days);
  console.log(values[0]);
  return results;
};

try {
  const { vals } = parseArgument(process.argv);

  console.log(excerciseCalculator(vals));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
