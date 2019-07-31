import React, {useState, useEffect} from 'react';
import axios from 'axios';



const Info = ({country}) => {
    const [weather, setWeather]= useState({})
    const langs = country.languages.map((l) => 
            <Language lang={l} key={l.name} /> 
        
        )
    const weatherHook = () =>{
        axios
        .get("https://api.apixu.com/v1/current.json?key=9e4f9f4eaba74f4d8cf205851193007&q="+country.capital)
        .then( response =>{
            setWeather(response.data)
        })
    }
    useEffect(weatherHook, [])
    
    let weathericon = () => {
        if(weather.current){
            
            return <div><img src={weather.current.condition.icon}></img> <p>{weather.current.wind_kph} km/h {weather.current.wind_dir}</p></div>
        }
    }
    

    return (
        <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>

        <img width="300" height="200" alt={country.name} src={country.flag}></img> 

        <h1>Languages</h1>
        {langs}
        
        <h2>Weather</h2>
        {weathericon()}
        
        
        </div>
    )
}

const Language = ({lang}) => {
    return(
        <p>{lang.name} </p>
    )
}

export default Info;