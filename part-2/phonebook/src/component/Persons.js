import React from "react";

const Persons = ({ list }) => {
  return (
    <div>
      {list.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
