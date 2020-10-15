import React, { useState } from "react";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    persons.find((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([...persons, newPerson]);

    setNewNumber("");
  };

  const handleInput = (e) => {
    return e.target.name === "name"
      ? setNewName(e.target.value)
      : e.target.name === "number"
      ? setNewNumber(e.target.value)
      : null;
  };

  const handleFilter = (e) => {
    setFilterInput(e.target.value);
  };

  const list =
    filterInput.length > 0
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filterInput.toLowerCase())
        )
      : persons;

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterInput={filterInput} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleInput={handleInput}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons list={list} />
    </div>
  );
};

export default App;
