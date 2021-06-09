import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterPersons, setFilter] = useState('')

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

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value);
  }

  const personsToShow = !filterPersons
  ? persons
  : persons.filter(person => JSON.stringify(person).toLowerCase().includes(filterPersons))

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with<input value={filterPersons} onChange={handleFilterChange}/>
        </div>
      <h2>add a new</h2>
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

      {personsToShow.map(person => <div key={person.name}>
                                      <span>{person.name}</span>
                                      <span> {person.number}</span>
                                  </div>)}
    </div>
  )
}

export default App