import { useState, useEffect } from "react";

import axios from "axios";

const CountryDetails = ({ country }) => {
  const name = country.name.common;
  const capitals = country.capital;
  const area = country.area;
  const languages = country.languages;
  const { png, alt } = country.flags;

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
    </>
  );
};

const CountriesList = ({ countries, query }) => {
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
    <p key={country.name.common}>{country.name.common}</p>
  ));
};

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
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
      <CountriesList countries={countries} query={query} />
    </>
  );
}

export default App;
