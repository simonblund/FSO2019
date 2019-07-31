import React, {useState, useEffect} from 'react';
import Form from './components/Form'
import List from './components/List'
import Search from './components/Search'
import './App.css';
import contactService from './services/contactService'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [filterPersons, setFilterPersons] = useState(persons);
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  
  const personHook = () => {
    contactService
    .getAll()
    .then(response => {
      setPersons(response)
      setFilterPersons(response)
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
      const changeConf = window.confirm(newName+' is already added to phonebook, would you like to change the number?')
      if(changeConf) {
        const changee = persons.find(i => i.name === personObj.name )
        contactService.update(changee.id, personObj)
      }
    } else{
        contactService.create(personObj)
        contactService
          .getAll()
          .then(response => {
            setPersons(response)
            setFilterPersons(response)
          })
        
    }
    setNewName('')
    setNewPhone('')
  }

  let list = () => {
    if(filterPersons !== null){
      return <List persons={filterPersons} />
    } else {
      return <p>No persons in list</p>
    }
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
      {list()}
    </div>
  )
}

export default App;
