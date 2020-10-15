import React from "react";

const PersonForm = ({ handleInput, newName, newNumber, addPerson }) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInput} name="name" />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleInput} name="number" />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
