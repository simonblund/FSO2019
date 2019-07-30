import React from 'react';

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
        <li>{person.name} - {person.number}</li>
    )
}

export default List;