import { useState, useEffect } from "react";
import axios from "axios";

import personService from "./services/persons";

const SearchFilter = ({ filter, onChange }) => (
  <div>
    filter shown with
    <input value={filter} onChange={onChange} />
  </div>
);

const AddPersonForm = ({
  onSubmit,
  newName,
  newPhoneNumber,
  handleNameChange,
  handlePhoneNumberChange,
}) => (
  <>
    <h2>New</h2>
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone number:{" "}
        <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
);

const PersonsList = ({ persons, onDeletePerson }) => (
  <>
    <h2>Numbers</h2>
    {persons.map(({ id, name, number }) => (
      <div key={name}>
        {name} {number}
        <button onClick={() => onDeletePerson(id, name)}>delete</button>
      </div>
    ))}
  </>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAllPersons()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName,
      number: newPhoneNumber,
    };

    const existingPerson = persons.find(({ name }) => name === newName);

    if (existingPerson) {
      if (existingPerson.number) {
        const confirmation = window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        );

        if (!confirmation) return;
      }

      updateContact(existingPerson.id, newPersonObject).then(() => {
        setNewName("");
        setNewPhoneNumber("");
      });
      return;
    }

    personService.createPerson(newPersonObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewPhoneNumber("");
    });
  };

  const updateContact = (id, updatedPersonObject) => {
    return personService
      .updatePerson(id, updatedPersonObject)
      .then((returnedPerson) => {
        const nextPersons = persons.map((person) =>
          person.id === returnedPerson.id ? returnedPerson : person
        );

        setPersons(nextPersons);
      });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeletePerson = (id, name) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmation) return;

    personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)));
  };

  const personsToShow = persons.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <SearchFilter filter={filter} onChange={handleFilterChange} />
      <AddPersonForm
        onSubmit={addContact}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNameChange={handleNameChange}
        handlePhoneNumberChange={handlePhoneNumberChange}
      />
      <PersonsList
        persons={personsToShow}
        onDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
