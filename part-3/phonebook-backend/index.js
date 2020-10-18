const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 3001;
let peopleDB = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(peopleDB);
});

app.get("/info", (req, res) => {
  const length = peopleDB.length;
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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  peopleDB = peopleDB.filter((person) => person.id !== id);

  res.status(204).end();
});
app.listen(PORT, () => {
  console.log(`Server on:${PORT}`);
});
