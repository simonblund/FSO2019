import React from 'react';
import contactService from '../services/contactService';

const List = ({persons})=> {

    const deletePerson = (event) =>{
        const identifier = parseInt(event.target.value, 10)
        const deleteconfirm = window.confirm("Are you sure you want to delete "+persons.find(i => i.id === identifier ).name+"?")
         if(deleteconfirm){
             contactService.deletePerson(event.target.value)
             window.location.reload()
         }
     }
    const rows = () => persons.map(person =>
        <Person person={person} key={person.name} onact={deletePerson}/>
      )
    return(
        <div>
            
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

const Person = ({person,onact}) =>{
    
    
    return(
        <li>{person.name} - {person.number} <button onClick={onact} value={person.id}>Delete</button></li>
    )

}

export default List;