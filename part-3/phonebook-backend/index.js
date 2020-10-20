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

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  console.log(body.name);

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON());
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { runValidators: true, new: true }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((people) => {
      if (people) {
        res.json(people);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.get("/info", (req, res) => {
  const length = Person.length;
  const datetime = new Date();
  const mesage = `<p>Phonebook has info or ${length} people</p>
                  <p>${datetime}</p>`;
  res.send(mesage);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "ValidationError") {
    return response.status(500).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server on:${PORT}`);
});
