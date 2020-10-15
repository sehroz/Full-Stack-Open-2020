import React, { useState, useEffect } from "react";
import axios from "axios";

const ShowCountries = ({ countries, search }) => {
  const [show, setShow] = useState(false);
  const [showCountry, setShowCountry] = useState("");
  const list = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (list.length > 10) {
    let message = "Too many matches, specify another filter";
    return message;
  }

  const handleShow = (e) => {
    setShow(!show);
    setShowCountry(e.target.name);
  };

  if (list.length <= 10 && list.length > 1) {
    return (
      <>
        {list.map((country) => (
          <div key={country.name}>
            {country.name}

            {show && country.name === showCountry ? (
              <>
                <button onClick={handleShow} name={country.name}>
                  close
                </button>
                <CountryData country={country} />
              </>
            ) : (
              <button onClick={handleShow} name={country.name}>
                show
              </button>
            )}
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {list.map((country) => (
        <CountryData country={country} />
      ))}
    </>
  );
};

const CountryData = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    () => {
      axios
        .get(
          `https://api.weatherstack.com/current?access_key=${REACT_APP_API_KEY}&query=${country.capital}`
        )
        .then((res) => {
          setWeather(res.data);
        });
    };
  }, []);
  return (
    <div key={country.name}>
      <h1> {country.name} </h1>
      <p>captial {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      {country.languages.map((lang) => (
        <ul key={lang.name}>
          <li> {lang.name} </li>
        </ul>
      ))}
      <div>
        <img
          src={country.flag}
          alt={country.name}
          style={{ height: "100px", width: "auto" }}
        />
      </div>
      <h2>Weather in {country.capital}</h2>
      <p>
        <b>temperature:</b>
        {weather.current.temperature}
      </p>
      <img
        src={weather.current.weather_icons}
        alt={current.weather.weather_descriptions}
      />
      <p>
        <b>wind:</b> {weather.current.wind_speed} mph
      </p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleInput} />
      </div>
      <ShowCountries countries={countries} search={search} />
    </div>
  );
};

export default App;
