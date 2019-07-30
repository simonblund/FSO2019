import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import List from './components/List'
import Search from './components/Search'



const App = () => {

  const [countries, SetCountries] = useState([])
  const [filtercountries, SetFilterCountries] = useState(countries)
  const [search, SetSearch] = useState('')

  const allCountriesHook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        SetCountries(response.data)
      })
  }
  const handleSearch = (event) => {
    SetFilterCountries(countries.filter(country => country.name.toLowerCase().indexOf(event.target.value.toLowerCase())!==-1))
  }
  useEffect(allCountriesHook, [])
  let content = <p>Search for a country</p>
  if(filtercountries.length < 11){
    content = <List countries={filtercountries} />
  }
  return (
    <div className="App">
      <div>
        <Search onChange={handleSearch}/>
        {content}
        
        
        
      </div>
    </div>
  );
}

export default App;
