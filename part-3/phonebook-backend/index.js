require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const Person = require("./models/person");
const PORT = process.env.PORT;

morgan.token("data", function getId(req) {
  const data = JSON.stringify(req.body);
  return data;
});

app.use(
  cors(),
  express.static("build"),
  express.json(),
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
app.get("/api/persons", (req, res) => {
  Person.find({}).then((people) => {
    res.json(people);
  });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then((people) => {
    res.json(people);
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  peopleDB = peopleDB.filter((person) => person.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
  } else if (peopleDB.find((person) => person.name == body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

app.listen(PORT, () => {
  console.log(`Server on:${PORT}`);
});
