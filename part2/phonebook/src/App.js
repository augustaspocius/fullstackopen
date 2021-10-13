import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

const Filter = ({ filter, filterhandler }) => {
  return (
    <div>
      filter shown with<input value={filter} onChange={filterhandler} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  return (
    persons.map(person => <div key={person.name}>
      <span>{person.name}</span>
      <span> {person.number}</span>
    </div>)
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilter] = useState('')

  useEffect(() => {
    console.log('effect');
      personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons');
  const addPerson = (event) => {
    console.log("addPerson");
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };



    const contains = persons.some(person => {
      return (JSON.stringify(newPerson.name) === JSON.stringify(person.name))
            && (JSON.stringify(newPerson.number) === JSON.stringify(person.number));
    });

    !contains ? 
        personsService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
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
      <Filter filter={filterPersons} filterhandler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handlePhoneChange={handlePhoneChange} />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App