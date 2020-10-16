import React from "react";

const Persons = ({ list, deletePerson }) => {
  return (
    <div>
      {list.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.name, person.id)}>
            Delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
