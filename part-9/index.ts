import express from "express";

import calculateBmi from "./calculateBmi";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  if (!req.query["weight"] || !req.query["height"])
    throw new Error("Params Missing!");

  if (
    !isNaN(Number(req.query["weight"])) &&
    !isNaN(Number(req.query["height"]))
  ) {
    const WebBmi = {
      weight: req.query["weight"],
      height: req.query["height"],
      bmi: calculateBmi(
        Number(req.query["height"]),
        Number(req.query["weight"])
      ),
    };
    res.json(WebBmi);
  } else {
    throw new Error("malformatted parameters");
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
