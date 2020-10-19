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
  Person.find({})
    .then((people) => {
      res.json(people);
    })
    .catch((err) => console.log(err));
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((people) => {
      res.json(people);
    })
    .catch((err) => console.log(err));
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      console.log(err);
      res.statusMessage(400).send({ error: "malformatted id" });
    });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  console.log(body);
  if (!body.name || !body.number) {
    return res.status(400).json({ error: "content missing" });
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
