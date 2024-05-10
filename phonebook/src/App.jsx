import { useState } from "react";

const Person = ({ person }) => {
  return <li>{person.name}</li>;
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 0 }]);
  const [newName, setNewName] = useState("");

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const addPersons = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      id: persons.length + 1,
    };

    if (persons.some(p => p.name === person.name)) {
      event.preventDefault();
      alert(`${person.name} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(person));
      setNewName("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersons}>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default App;
