import express from "express";
import diaRouter from "./routes/diagno";
import patsRouter from "./routes/pats";
import cors from "cors";
const app = express();
app.use(cors(), express.json());

const PORT = 3002;

app.get("/ping", (_req, res) => {
  res.send("Hey");
});

app.use("/diagnoses", diaRouter);
app.use("/patients", patsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
