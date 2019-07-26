import React, {useState} from 'react';

const List = ({persons})=> {
    const rows = () => persons.map(person =>
        <Person person={person} key={person.name}/>
      )
    return(
        <div>
            
            <ul>
                {rows()}
            </ul>
        </div>
    )
}

const Person = ({person},{key}) =>{

    return(
        <li>{person.name} - {person.phone}</li>
    )
}

export default List;