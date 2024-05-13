import { useState, useEffect } from "react";
import axios from "axios";
import personService from "./services/persons";

const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const Notification = ({message})=>{
  const notificationStyle = {
    backgroundColor: '#ccc',
    color : 'green',
    border : 'solid 2px #green',
    padding : '10',
    fontSize : '2em'
  }
  return(
    <p style={notificationStyle}>{message}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const changeName = (event) => {
    setNewName(event.target.value);
  };
  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPersons = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };

    if (persons.some((p) => p.name === person.name)) {
      event.preventDefault();
      alert(`${person.name} is already added to the phonebook`);
    } else {
      personService.addPerson(person).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setErrorMessage(`${person.name} successfully added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)

      }
    );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <form onSubmit={addPersons}>
        <div>
          name: <input value={newName} onChange={changeName} />
        </div>
        <br />
        <div>
          number:{" "}
          <input value={newNumber} onChange={changeNumber} type="number" />
        </div>
        <br />
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
