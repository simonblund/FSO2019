import React from 'react';

const Country = ({country}) => {
    return(
        <li>{country.name}</li>
    )
}
const List = ({ countries }) => {

    const rows = () => countries.map(country =>
        <Country country={country} key={country.alpha2Code}/>
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