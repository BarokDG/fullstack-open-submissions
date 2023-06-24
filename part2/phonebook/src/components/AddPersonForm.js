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

export default AddPersonForm;
