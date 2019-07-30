import React from 'react';



const Info = ({country}) => {
    const langs = country.languages.map((l) => 
            <Language lang={l} key={l.name} /> 
        
        )

    return (
        <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <img width="300" height="200" alt={country.name} src={country.flag}></img>

        <h1>Languages</h1>
        {langs}
        
        </div>
    )
}

const Language = ({lang}) => {
    console.log('withn',lang)
    return(
        <p>{lang.name} </p>
    )
}

export default Info;