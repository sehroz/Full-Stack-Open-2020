interface DataLabel {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const excerciseCalculator = (
  daily: Array<number>,
  target: number
): DataLabel => {
  let totalHours = daily.reduce((a, b) => a + b, 0);
  let days = daily.filter((d) => d !== 0).length;
  let rate = totalHours == target ? 3 : totalHours == target * 0.5 ? 2 : 1;
  let results = {
    periodLength: daily.length,
    trainingDays: days,
    success: totalHours / days <= target ? false : true,
    rating: rate,
    ratingDescription: rate === 3 ? "Perfect" : "Reengage",
    target: target,
    average: totalHours / daily.length,
  };
  return results;
};

const daily = [3, 0, 2, 4.5, 0, 3, 1];
console.log(excerciseCalculator(daily, 2));
