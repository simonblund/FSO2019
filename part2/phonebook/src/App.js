import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import List from './components/List'
import Search from './components/Search'
import Notification from './components/Notification'
import './App.css';
import contactService from './services/contactService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterPersons, setFilterPersons] = useState(persons);
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState({})


  const personHook = () => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response)
        setFilterPersons(response)
      })

  }
  useEffect(personHook, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterPersons(persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))
  }

  // Add or edit persn
  const addPerson = (event) => {
    // prevent the form's default action
    event.preventDefault()

    // This is how the person object looks.
    let personObj = {
      name: newName,
      number: newPhone
    }
    // If person with name exists, ask if you want to update that person instead.
    if (persons.find(i => i.name === personObj.name)) {
      const changeConf = window.confirm(newName + ' is already added to phonebook, would you like to change the number?')
      // If you want to update the person
      if (changeConf) {
        const changee = persons.find(i => i.name === personObj.name)

        // Update the person with the found id
        contactService
          .update(changee.id, personObj)
          .catch(error => {
            setFilterPersons(filterPersons.filter(fp => fp.id !== changee.id))
            setErrorMessage(
              {
                type: 'error',
                message: 'Update of ' + personObj.name + error+ ' failed'
              }
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        
        changee.number = personObj.number

        // If update succeeded notify
        setErrorMessage(
          {
            type: 'success',
            message: 'Person ' + personObj.name + ' was updated'
          }

        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } else {
      // If no person with name exists, create a new person
      contactService
        .create(personObj)
        .then( response => {
          personObj = response
          setPersons(persons.concat(personObj))
          setFilterPersons(filterPersons.concat(personObj))
        })
        .catch(error => {
          // Catch errors on create
          console.log('On create', error)
          setErrorMessage(
            {
              type: 'error',
              message: 'Creation of ' + personObj.name + ' failed with the error: '+error.response.data.error
            }

          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

      // On success notify
      setErrorMessage(
        {
          type: 'success',
          message: 'Person ' + personObj.name + ' was created'
        }

      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
    setNewName('')
    setNewPhone('')
  }

  let list = () => {
    if (filterPersons !== null) {
      return <List persons={filterPersons} />
    } else {
      return <p>No persons in list</p>
    }
  }

  const handleChange = { name: handleNameChange, number: handlePhoneChange }
  const newVariables = { name: newName, number: newPhone, }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <h2>Search</h2>
      <Search onChange={handleFilter} />
      <h2>Add new</h2>
      <Form handleChange={handleChange} action={addPerson} newVariables={newVariables} />
      <h2>List</h2>
      {list()}
    </div>
  )
}

export default App;
