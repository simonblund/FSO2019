import React, {useState} from 'react';
import Form from './components/Form'
import List from './components/List'
import './App.css';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '0401111111' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addPerson = (event)=>{
    event.preventDefault()
    const personObj = {
      name: newName,
      phone: newPhone,
    }
    if(persons.find(i => i.name === personObj.name)){
      alert(newName+' is already added to phonebook')
    } else{
        setPersons(persons.concat(personObj))
    }
    setNewName('')
    setNewPhone('')
  }
  const handleChange = {name:handleNameChange, phone:handlePhoneChange}
  const newVariables = {name: newName, phone:newPhone,}

  return (
    <div>
      <h1>Phonebook</h1>
      <div>debug: {newName} {newPhone}</div>
      <h2>Add new</h2>
      <Form handleChange = {handleChange} action = {addPerson} newVariables ={newVariables}/>
      <h2>List</h2>
      <List persons={persons} />
    </div>
  )
}

export default App;
