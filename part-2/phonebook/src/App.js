import React, { useState, useEffect } from "react";

import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((err) => console.log("Cannot connect", err));
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
      personService
        .createPerson(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNewNumber("");
        })
        .catch((err) =>
          console.log(`Cannot add person ${newPerson.name}`, err)
        );
    }
  };

  const deletePerson = (name, id) => {
    return window.confirm(`Delete ${name}?`)
      ? personService
          .deletePerson(id)
          .then(setPersons(persons.filter((person) => person.id !== id)))
          .catch((err) => console.log(`Cannot delete person ${name}`, err))
      : null;
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

      <Persons list={list} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
