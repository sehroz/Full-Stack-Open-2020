const express = require("express");
const app = express();
const PORT = 3001;
const peopleDB = require("./db.json");

app.get("/api/persons", (req, res) => {
  res.send(peopleDB);
});

app.listen(PORT, () => {
  console.log(`Server on:${PORT}`);
});
