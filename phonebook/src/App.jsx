import { useState, useEffect } from "react";
import personService from "./services/persons";

const Person = ({ person, deletePerson, updatePerson }) => {
  const [newName, setNewName] = useState(person.name);
  const [newNumber, setNewNumber] = useState(person.number);

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleUpdate = () => {
    const updatedPerson = {
      ...person,
      name: newName,
      number: newNumber,
    };
    updatePerson(updatedPerson);
  };

  return (
    <>
      <input type="text" value={newName} onChange={changeName} />
      <input type="number" value={newNumber} onChange={changeNumber} />
      <button onClick={() => deletePerson(person.id)}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
      <br />
    </>
  );
};

const Notification = ({ message }) => {
  const notificationStyle = {
    backgroundColor: "#ccc",
    color: "green",
    border: "solid 2px #green",
    padding: "10",
    fontSize: "2em",
  };
  return <p style={notificationStyle}>{message}</p>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      personService
        .addPerson(person)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setErrorMessage(`${person.name} successfully added`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage(`El nombre no puede ser menor de 5 caracteres`);
        });
    }
  };

  const deletePerson = (id) => {
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
      setErrorMessage(`Person successfully deleted`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    });
  };

  const updatePerson = (updatedPerson) => {
    personService
      .updatePerson(updatedPerson.id, updatedPerson)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          )
        );
        setErrorMessage(`${returnedPerson.name} successfully updated`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setErrorMessage(`El nombre no puede ser menor de 5 caracteres`);
      });
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
          <button type="submit" onClick={addPersons}>
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            deletePerson={deletePerson}
            updatePerson={updatePerson}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
