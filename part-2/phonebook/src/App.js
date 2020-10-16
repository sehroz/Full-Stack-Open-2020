import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      axios
        .post(`http://localhost:3001/persons`, newPerson)
        .then((res) => setPersons([...persons, res.data]))
        .catch(`Cannot add person ${newPerson.name}`);
    }
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
