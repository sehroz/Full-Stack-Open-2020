/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express"

import calculateBmi from "./calculateBmi"
import excerciseCalculator from "./excerciseCalculator"
const app = express()
import bodyParser from "body-parser"
app.use(bodyParser.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack")
})

app.get("/bmi", (req, res) => {
  if (!req.query["weight"] || !req.query["height"])
    throw new Error("Params Missing!")

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
    }
    res.json(WebBmi)
  } else {
    throw new Error("malformatted parameters")
  }
})

app.post("/calc", (req, res) => {
  if (!req.body["daily_exercises"] || !req.body["target"])
    throw new Error("Params Missing!")

  if (!Array(req.body["daily_exercises"])) {
    throw new Error("malformatted parameters")
  }

  if (isNaN(req.body["target"])) {
    throw new Error("malformatted parameters")
  }

  return res.json(
    excerciseCalculator(
      JSON.parse(req.body["daily_exercises"]),
      Number(req.body["target"])
    )
  )
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
