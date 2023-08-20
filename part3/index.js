const express = require("express");
const morgan = require("morgan");

const app = express();

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", function (request) {
  return JSON.stringify(request.body);
});

app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/api/persons", (_, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const person = persons.find((person) => id === person.id);

  if (!person) {
    return response.status(404).end();
  }

  response.json(person);
});

app.post("/api/persons", (request, response) => {
  const newPerson = { ...request.body };

  if (!newPerson.name) {
    return response.status(400).json({
      error: "name must be included in request body",
    });
  }

  if (!newPerson.number) {
    return response.status(400).json({
      error: "number must be included in request body",
    });
  }

  const oldPersonWithSameNameAsNewPerson = persons.find(
    (person) => person.name === newPerson.name
  );

  if (oldPersonWithSameNameAsNewPerson) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  newPerson.id = Math.floor(Math.random() * 1_000_000);
  persons.push(newPerson);

  response.send(`${newPerson.name} has been added`);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);

  const personIndex = persons.findIndex((person) => id === person.id);

  if (personIndex === -1) {
    return response.status(404).end();
  }

  const person = persons[personIndex];
  persons.splice(personIndex, 1);

  response.send(`${person.name} has been deleted`);
});

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${
      persons.length
    } people <br /> ${new Date().toString()}`
  );
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
