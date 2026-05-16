import { useState } from 'react'
import { PersonForm } from './components/PersonForm';
import { Filter } from './components/Filter';
import { Persons } from './components/Persons';
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const handleInputChange = (event) => {
    setNewName(event.target.value);
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  const filterNames = persons.filter((person) => (
    person.name.toLowerCase().includes(search.toLowerCase())
  ))
  const handleInputNumber = (event) => {
    setNumber(event.target.value);
  }
  const addDetails = (event) => {
    event.preventDefault();
    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (nameExists) {
      alert(`${newName} is already added to phonebook `)
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(nameObject));
    }
    setNewName('');
    setNumber('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h2>add a new</h2>
      <PersonForm newName={newName} addDetails={addDetails}  newNumber={newNumber}   handleInputChange={handleInputChange} 
      handleInputNumber={handleInputNumber} />

      <h2>Numbers</h2>
      <Persons filterNames={filterNames} />
    </div>
  )
}

export default App 