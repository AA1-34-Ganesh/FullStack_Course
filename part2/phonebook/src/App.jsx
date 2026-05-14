import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
       ]) ;
  const [newName, setNewName] = useState('') ;
  const [newPhoneNumber,setPhoneNumber]=useState('');
   const handleInputChange=(event)=>{
            setNewName(event.target.value);
   }
  const handleInputNumber=(event)=>{
    setPhoneNumber(event.target.value);
  }
  const addDetails=(event)=>{
    event.preventDefault();
    const nameExists=persons.some(
        (person)=>person.name===newName
    );
    if(nameExists){
        alert(`${newName} is already added to phonebook ` )
    }else{
        const nameObject={
            name:newName,
            phoneNumber:newPhoneNumber
        }
        setPersons(persons.concat(nameObject));
    }
    setNewName('');
    setPhoneNumber('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addDetails}>
        <div>
          name:<input  value={newName} onChange={handleInputChange} /><br/>
          number:<input  value={newPhoneNumber} onChange={handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person)=>(
            <div key={person.id}>
              <p>{person.name}:{person.phoneNumber}</p>
           </div>
        ))
      }

    </div>
  )
}

export default App 