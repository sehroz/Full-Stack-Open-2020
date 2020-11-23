import express from "express";
import cors from "cors";
const app = express();
app.use(cors(), express.json());

const PORT = 3002;

app.get("/ping", (_req, res) => {
  res.send("Hey");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
