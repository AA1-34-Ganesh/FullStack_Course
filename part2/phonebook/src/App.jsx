import { useEffect, useState } from 'react'
import { PersonForm } from './components/PersonForm';
import { Filter } from './components/Filter';
import { Persons } from './components/Persons';
import axios from 'axios';
import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([]);
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
        number: newNumber
      }
     personService.create(nameObject).then(response=>{
      setPersons(prev=>prev.concat(response));
   })
     
    }
    setNewName('');
    setNumber('');
  }
  useEffect(() => {
      personService.getAll().then((initialData)=>{
        setPersons(initialData)
      })
  }, [])
  const remove=(id)=>{
     const person=persons.find(person=>person.id===id);

     const confirmDelete=window.confirm(
       `Delete ${person.name}`
     )
     if(confirmDelete){
      personService.deletePerson(id).then(()=>{
        setPersons(persons.filter(person=>person.id !==id))
      })
     }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />

      <h2>add a new</h2>
      <PersonForm newName={newName} addDetails={addDetails} newNumber={newNumber} handleInputChange={handleInputChange}
        handleInputNumber={handleInputNumber} />
      
      <h2>Numbers</h2>
      <Persons filterNames={filterNames} remove={remove} />
    </div>
  )
}

export default App 