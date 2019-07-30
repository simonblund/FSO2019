import React, {useState} from 'react';
import Form from './components/Form'
import List from './components/List'
import Search from './components/Search'
import './App.css';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '0401111111' },
      { name: 'Martti Hellas',
      phone: '040123423111' }

  ])
  let [filterPersons, setFilterPersons] = useState(persons);
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

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

  // In my very personal opinion this looks cleaner than the alternative.
  // If there is an even cleaner way please PR and comment it.
  const handleChange = {name:handleNameChange, phone:handlePhoneChange}
  const newVariables = {name: newName, phone:newPhone,}

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
