import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson = (event) => {
    console.log("addPerson");
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };

    const contains = persons.some(person =>{
      return JSON.stringify(newPerson) === JSON.stringify(person);
    });

    !contains ? setPersons(persons.concat(newPerson)) 
                    : alert(`${newName} ${newNumber} is already added to phonebook`);
    
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {persons.map(person => <div key={person.name}>
                                  <span>{person.name}</span>
                                  <span> {person.number}</span>
                              </div>)}
    </div>
  )
}

export default App