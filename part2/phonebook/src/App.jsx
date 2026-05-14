import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {   
        name: 'Arto Hellas' },
        {
            name:"Ada Lovelace"
        }
  ]) ;
  const [newName, setNewName] = useState('') ;
  
   const handleInputChange=(event)=>{
            setNewName(event.target.value);
   }

  const addName=(event)=>{
    event.preventDefault();
    const nameExists=persons.some(
        (person)=>person.name===newName
    );
    if(nameExists){
        alert(`${newName} is already added to phonebook ` )
    }else{
        const nameObject={
            name:newName
        }
        setPersons(persons.concat(nameObject));
    }
    setNewName('');
  }
   console.log(newName);
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:<input  value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person)=>(
            <div key={person.id}>
              <p>{person.name}</p>
           </div>
        ))
      }

    </div>
  )
}

export default App 