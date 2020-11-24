import express from "express";
import diaRouter from "./routes/diagno";
import cors from "cors";
const app = express();
app.use(cors(), express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  res.send("Hey");
});

app.use("/api/diagnoses", diaRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
