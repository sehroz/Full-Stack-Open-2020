const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 3001;
const peopleDB = require("./db.json");

app.get("/api/persons", (req, res) => {
  res.send(peopleDB);
});

app.get("/info", (req, res) => {
  const length = Object.keys(peopleDB).length;
  const datetime = new Date();
  const mesage = `<p>Phonebook has info or ${length} people</p>
                  <p>${datetime}</p>`;
  res.send(mesage);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = peopleDB.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
app.listen(PORT, () => {
  console.log(`Server on:${PORT}`);
});
