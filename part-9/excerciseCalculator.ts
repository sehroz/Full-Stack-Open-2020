// interface Values {
//   vals: Array<number>;
// }

// const parseArgument = (args: Array<string>): Values => {
//   if (args.length < 1) throw new Error("Not enough");

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       vals: args.map(Number).slice(2, args.length),
//     };
//   } else {
//     throw new Error("Provide numbers!");
//   }
// };

interface DataLabel {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const excerciseCalculator = (
  values: Array<number>,
  target: number
): DataLabel => {
  const data = values
  console.log(data)
  const totalHours = data.reduce((a, b) => a + b, 0)
  const days = data.filter((d) => d !== 0).length
  const rate =
    totalHours / values.length >= target
      ? 3
      : totalHours == target * 0.5
      ? 2
      : 1
  const results = {
    periodLength: data.length,
    trainingDays: days,
    success: totalHours / data.length <= target ? false : true,
    rating: rate,
    ratingDescription: rate === 3 ? "Perfect" : "Reengage",
    target: target,
    average: totalHours / data.length,
  }

  return results
}

export = excerciseCalculator
