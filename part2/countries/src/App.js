import React, { useState, useEffect, componentDidMount } from 'react'
import axios from 'axios'


const SearchCountries = ({ search, searchHandler }) => {
  return (
    <div>
      find countries <input value={search} onChange={searchHandler} />
    </div>
  )
}



const Countries = ({ countries }) => {

  if (countries.length <= 10 && countries.length > 1 && countries.length > 0) {
    return (
      countries.map(country => {
        return (
          <Country country={country} />
        )
      }
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
      <CountryDetails country={country} />
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

const Country = ({ country }) => {
  const [showResults, setShowResults] = useState(false)
  const onClick = () => { setShowResults(!showResults) }
  return (
    <div>
      <span>{country.name} <button onClick={onClick}>Show</button></span>
      {showResults ? <CountryDetails country={country} /> : null}
    </div>
  )
}

const Button = (props) => {
  const handleClick = () => {

  }
  return (
    <button onClick={this.handleClick}>
      {props.text}
    </button>
  )
}

const CountryDetails = ({ country }) => {
  console.log("render");
  const [apiResponse, setForecast] = useState([])

  useEffect(() => {
    const fetchWeather = () =>{
      console.log('handleForecasteffect');
      const api_key = process.env.REACT_APP_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
      axios.get(url)
      .then(response => {
        setForecast(response.data);
      }).catch(error => {
        console.log(error);
      });
    }

    fetchWeather(); 
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Spoken Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="200" height="150"></img>
      {apiResponse.length ? <CapitalForecast capital={country.capital} weather={apiResponse}/> : null}
    </div>
  )
}

const CapitalForecast = ({ capital, weather }) => {
  // const api_key = process.env.REACT_APP_API_KEY
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
  // const [apiResponse, setForecast] = useState({})
  // axios.get(url)
  // .then(response => {
  //   setForecast(response.data);
  //   // console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
  // }).catch(error => {
  //   console.log(error);
  // });




  return (
    <div>
      <h3>Weather in {capital}</h3>
      <div>temperature: {weather.main.temp}</div>
      <div>wind: {weather.wind.speed}</div>
    </div>
  )
}

function App() {
  const [searchCountries, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  const handleSearching = (event) => {
    console.log(event.target.value);
    const country = event.target.value;
    setSearch(event.target.value);

    axios
      .get('https://restcountries.com/v2/all')
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
