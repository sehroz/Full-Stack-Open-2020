import React, { useState, useEffect } from "react";

import Filter from "./component/Filter";
import PersonForm from "./component/PersonForm";
import Persons from "./component/Persons";
import personService from "./services/persons";
import Msg from "./component/Msg";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [msg, setMsg] = useState(null);

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

    if (
      persons.find(
        (person) =>
          person.name === newPerson.name && person.number !== newPerson.number
      )
    ) {
      return window.confirm(
        `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
        ? updatePerson(newPerson)
        : null;
    } else if (
      persons.find(
        (person) =>
          person.name === newPerson.name && person.number === newPerson.number
      )
    ) {
      alert("Please change number to update this person.");
    } else
      personService
        .createPerson(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setMsg(`Added ${returnedPerson.name}`);
          setTimeout(() => setMsg(null), 5000);
          setNewNumber("");
        })
        .catch((err) =>
          console.log(`Cannot add person ${newPerson.name}`, err)
        );
  };

  const deletePerson = (name, id) => {
    return window.confirm(`Delete ${name}?`)
      ? personService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
            setMsg(`${name} deleted`);
            setTimeout(() => setMsg(null), 5000);
          })
          .catch((err) => console.log(`Cannot delete person ${name}`, err))
      : null;
  };

  const updatePerson = (newPerson) => {
    const person = persons.find((person) => person.name === newPerson.name);

    const changedPerson = { ...person, number: newPerson.number };

    personService.updatePerson(changedPerson).then((returnedPerson) => {
      setPersons(
        persons.map((person) =>
          person.id !== changedPerson.id ? person : returnedPerson
        )
      );
      setMsg(
        `Number changed for ${changedPerson.name} to ${changedPerson.number}`
      );
      setTimeout(() => setMsg(null), 5000);
    });
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
      <Msg msg={msg} />
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
