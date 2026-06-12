import { useEffect, useState } from 'react'
import { PersonForm } from './components/PersonForm';
import { Filter } from './components/Filter';
import { Persons } from './components/Persons';
import personService from './services/persons'
import Notification from './components/Notification';
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message,setMessage]=useState(null);
  const [type,setType]=useState('success');
  const showNotification=(text,type)=>{
           setMessage(text);
           setType(type);

         setTimeout(()=>{
          setMessage(null);
         },5000)  
  }
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
    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (nameExists) {
      const confirmExist = window.confirm((`${newName} is already added to phonebook, replace the old number with a new one? `));
      if (confirmExist) {

        const updatedPerson = {
          ...nameExists,
          number: newNumber
        }
        personService.update(nameExists.id, updatedPerson).then((response) => {
          setPersons(prev=>
            prev.map((person) => person.id !== nameExists.id ? person : response)
          )
         showNotification(`${nameExists.name} number is updated.`,'success' )
        }
        ).catch((error)=>{
           showNotification( `Information of ${nameExists.name} has already been removed from server`,
      'error')
      setPersons(prev =>
   prev.filter(person =>
      person.id !== nameExists.id
   )
)
        })
      
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService.create(nameObject).then(response => {
        setPersons(prev => prev.concat(response));
         showNotification(`Added ${nameObject.name}`,'success' );
      })
    .catch(error => {
      console.log(error.response.data)
         showNotification(error.response.data.error, 'error');
        })
     
    }
    setNewName('');
    setNumber('');
  }
  useEffect(() => {
    personService.getAll().then((initialData) => {
      setPersons(initialData)
    })
  }, [])
  const remove = (id) => {
    const person = persons.find(person => person.id === id);

    const confirmDelete = window.confirm(
      `Delete ${person.name}`
    )
    if (confirmDelete) {
      personService.deletePerson(id).then(() => {
        setPersons(prev=>prev.filter(person => person.id !== id))
          showNotification(`Deleted ${person.name}`,'success' )
      }).catch(error=>{
        showNotification(`${person.name} already was removed`,'error')
        setPersons(prev =>
   prev.filter(p => p.id !== id)
)
      })
    
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type}/>
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