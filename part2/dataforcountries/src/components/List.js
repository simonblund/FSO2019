import React from 'react';

const Country = ({country, onclick}) => {
    return(
        <li>{country.name} - <button onClick={onclick} value={country.name}>More info</button></li>
    )
}
const List = ({ countries, onclick }) => {

    const rows = () => countries.map(country =>
        <Country country={country} key={country.alpha2Code} onclick={onclick}/>
    )
    return (
        <div>
            {}
            <ul>
                {rows()}
            </ul>
        </div>
    )
}
export default List;