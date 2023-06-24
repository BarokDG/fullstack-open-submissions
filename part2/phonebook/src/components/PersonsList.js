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

export default PersonsList;
