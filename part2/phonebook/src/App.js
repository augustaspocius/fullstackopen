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

const Persons = ({ deleteHandler, persons }) => {

  return (
    persons.map(person =>
      <div key={person.id}>
        <span>{person.name}</span>
        <span> {person.number} </span>
        <button onClick={(e) => deleteHandler(person, e)}>delete</button>
      </div>)
  )
}

const Notification = ({ message, classMessage }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={classMessage}>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilter] = useState('')
  const [message, setMessage] = useState({ message: null, messageClass: "success" })

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };



    const contains = persons.some(person => {
      return (JSON.stringify(newPerson.name) === JSON.stringify(person.name))
        && (JSON.stringify(newPerson.number) === JSON.stringify(person.number));
    });
    const containsName = persons.some(person => {
      return (JSON.stringify(newPerson.name) === JSON.stringify(person.name))
        && (JSON.stringify(newPerson.number) != JSON.stringify(person.number));
    });

    const personIDmatch = persons.filter(person => person.name === newPerson.name);

    (!contains ?
      (!containsName ?
        personsService
          .create(newPerson)
          .then(response => {
            setPersons(persons.concat(response.data))
            setMessage(
              { message: `Added '${newPerson.name}'`, messageClass: "success" }
            )
            setTimeout(() => {
              setMessage({ message: null, messageClass: "success" })
            }, 5000)
          })
        : updatePerson(personIDmatch[0], newPerson))
      : alert(`${newName} ${newNumber} is already added to phonebook`))


    setNewName('');
    setNewNumber('');
  }

  const updatePerson = (person, newPerson) => {
    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)) {
      personsService
        .update(person.id, newPerson)
        .then(response => {
          personsService
          .getAll()
          .then(response => {
            setPersons(response.data)
          })  
          setMessage(
            { message: `Changed '${newPerson.name}' number`, messageClass: "success" }
          )
          setTimeout(() => {
            setMessage({ message: null, messageClass: "success" })
          }, 5000)
        })
        .catch(response => {
          setMessage(
            { message: `'${newPerson.name}' is already removed`, messageClass: "error" }
          )
          setTimeout(() => {
            setMessage({ message: null, messageClass: "success" })
          }, 5000)
        });
      personsService
        .getAll()
        .then(response => {
          setPersons(response.data)
        })

    }
  }

  const deletePerson = (person, event) => {

    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personsService
        .delete(person.id)
        .then(response => {
          personsService
            .getAll()
            .then(response => {
              setPersons(response.data)
            });
        })

    }
  }



  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const personsToShow = !filterPersons
    ? persons
    : persons.filter(person => JSON.stringify(person).toLowerCase().includes(filterPersons))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} classMessage={message.messageClass} />
      <Filter filter={filterPersons} filterhandler={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handlePhoneChange={handlePhoneChange} />

      <h2>Numbers</h2>

      <Persons deleteHandler={deletePerson} persons={personsToShow} />
    </div>
  )
}

export default App