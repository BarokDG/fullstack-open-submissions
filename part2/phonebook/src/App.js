import { useState, useEffect } from "react";

import personService from "./services/persons";

import AddPersonForm from "./components/AddPersonForm";
import PersonsList from "./components/PersonsList";
import SearchFilter from "./components/SearchFilter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationState, setNotificationState] = useState(null);

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

      setNotificationState({
        message: `${returnedPerson.name} added to contacts!`,
        type: "success",
      });

      setTimeout(() => {
        setNotificationState(null);
      }, 3000);
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

        setNotificationState({
          message: `${returnedPerson.name} contact details updated!`,
          type: "success",
        });

        return returnedPerson;
      })
      .catch((err) => {
        setNotificationState({
          message: `${updatedPersonObject.name} has already been removed from server`,
          type: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setNotificationState(null);
        }, 3000);
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

      <Notification notificationState={notificationState} />
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
