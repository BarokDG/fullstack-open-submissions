import { useState, useEffect } from "react";

import axios from "axios";

const CountryDetails = ({ country }) => {
  const [capitalWeatherData, setCapitalWeatherData] = useState(null);

  const name = country.name.common;
  const capitals = country?.capital;
  const area = country.area;
  const languages = country.languages;
  const { png, alt } = country.flags;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capitals[0]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setCapitalWeatherData(response.data);
      });
  }, [capitals]);

  return (
    <>
      <h1>{name}</h1>
      <p>capital {capitals.toString()}</p>
      <p>area {area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={png} alt={alt} />
      <h2>Weather in {capitals[0]}</h2>
      {capitalWeatherData ? (
        <>
          <p>temperature {capitalWeatherData.main.temp} Celsius</p>
          <img
            src={`https://openweathermap.org/img/wn/${capitalWeatherData.weather[0].icon}@2x.png`}
            alt={capitalWeatherData.weather[0].description}
          />
          <p>wind {capitalWeatherData.wind.speed} m/s</p>
        </>
      ) : (
        <p>Loading capital weather data</p>
      )}
    </>
  );
};

const CountriesList = ({ query, countries, onCountrySelect }) => {
  if (!query) {
    return null;
  }

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countriesToShow.length === 1) {
    return <CountryDetails country={countriesToShow[0]} />;
  }

  return countriesToShow.map((country) => (
    <p key={country.name.common}>
      {country.name.common}
      <button onClick={() => onCountrySelect(country)}>show</button>
    </p>
  ));
};

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSelectedCountry(null);
  };

  const handleCountrySelect = (country) => {
    setQuery(country.name.common);
    setSelectedCountry(country);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <>
      <div>
        <label>find countries</label>
        <input type="text" value={query} onChange={handleQueryChange} />
      </div>

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountriesList
          query={query}
          countries={countries}
          onCountrySelect={handleCountrySelect}
        />
      )}
    </>
  );
}

export default App;
