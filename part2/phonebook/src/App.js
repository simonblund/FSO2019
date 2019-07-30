import React, {useState, useEffect} from 'react';
import Form from './components/Form'
import List from './components/List'
import Search from './components/Search'
import './App.css';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons] = useState([])
  let [filterPersons, setFilterPersons] = useState(persons);
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const personHook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setPersons(response.data)
        setFilterPersons(response.data)
      })
  }
  useEffect(personHook, [])
  

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterPersons(persons.filter(person => person.name.toLowerCase().indexOf(event.target.value.toLowerCase())!==-1))
  }

  const addPerson = (event)=>{
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newPhone,
    }
    if(persons.find(i => i.name === personObj.name)){
      alert(newName+' is already added to phonebook')
    } else{
        setPersons(persons.concat(personObj))
    }
    setNewName('')
    setNewPhone('')
  }

  

  const handleChange = {name:handleNameChange, number:handlePhoneChange}
  const newVariables = {name: newName, number:newPhone,}

  return (
    <div>
      <h1>Phonebook</h1>
      <div>debug: {newName} {newPhone}</div>
      <h2>Search</h2>
      <Search onChange={handleFilter}/>
      <h2>Add new</h2>
      <Form handleChange = {handleChange} action = {addPerson} newVariables ={newVariables}/>
      <h2>List</h2>
      <List persons={filterPersons} />
    </div>
  )
}

export default App;
