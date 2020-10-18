const { response } = require("express");
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = 3001;

morgan.token("data", function getId(req) {
  const data = JSON.stringify(req.body);
  return data;
});

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

app.use(
  express.json(),
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
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

const generateID = () => {
  const newId = Math.floor(Math.random() * 1000000);

  return newId;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  } else if (peopleDB.find((person) => person.name == body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  peopleDB = peopleDB.concat(person);

  res.json(person);
});

app.listen(PORT, () => {
  console.log(`Server on:${PORT}`);
});
