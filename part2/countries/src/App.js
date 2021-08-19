import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SearchCountries = ({ search, searchHandler }) => {
  return (
    <div>
      find countries<input value={search} onChange={searchHandler} />
    </div>
  )
}

const Countries = ({ countries }) => {
  if (countries.length <= 10 && countries.length > 1 && countries.length > 0) {
    return (
      countries.map(country =>
        <div>
          <span>{country.name}</span>
        </div>
      ))
  }
  else if (countries.length > 10) {
    return (
      <div>
        <span>Too many matches, specify another filter</span>
      </div>
    )
  }
  else if (countries.length == 1) {
    return (countries.map(country =>
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
        <img src={country.flag} width="400" height="300"></img>
      </div>
    ))
  }
  else {
    return (
      <div>
        <span>No results</span>
      </div>
    )
  }
}

function App() {
  const [searchCountries, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearching = (event) => {
    console.log(event.target.value);
    const country = event.target.value;
    setSearch(event.target.value);

    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })

  }

  const countriesToShow = !searchCountries
    ? []
    : countries.filter(country => JSON.stringify(country.name).toLowerCase().includes(searchCountries))

  return (
    <div>
      <SearchCountries search={searchCountries} searchHandler={handleSearching} />
      <Countries countries={countriesToShow} />
    </div>
  );
}

export default App;
