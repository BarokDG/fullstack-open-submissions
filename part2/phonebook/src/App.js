import { useState } from "react";

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

const PersonsList = ({ persons }) => (
  <>
    <h2>Numbers</h2>
    {persons.map(({ name, number }) => (
      <div key={name}>
        {name} {number}
      </div>
    ))}
  </>
);

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addContact = (event) => {
    event.preventDefault();

    if (persons.find(({ name }) => name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPersonObject = {
      name: newName,
      number: newPhoneNumber,
    };

    setPersons(persons.concat(newPersonObject));
    setNewName("");
    setNewPhoneNumber("");
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
      <PersonsList persons={personsToShow} />
    </div>
  );
};

export default App;
