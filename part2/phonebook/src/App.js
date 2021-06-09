import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    console.log("addPerson");
    event.preventDefault();
    const newPerson = {
      name: newName
    };

    const contains = persons.some(person =>{
      return JSON.stringify(newPerson) === JSON.stringify(person);
    });
    
    !contains ? setPersons(persons.concat(newPerson)) 
                    : alert(`${newName} is already added to phonebook`);
    
    setNewName('');
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(person => <div key={person.name}>{person.name}</div>)}
    </div>
  )
}

export default App