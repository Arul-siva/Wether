import React, { useEffect, useRef, useState } from "react";
import rain from "../components/images/rain.webp";
import humitidy from "../components/images/humitidy_.png";
import air from "../components/images/air-flow.png";
import wether from '../components/images/wether.avif'
import { FaSearch } from "react-icons/fa";

const Wether = () => {
  const inputRef = useRef();
  const [image, setImage] = useState(wether);
  const [city, setCity] = useState("");
  const [temper, setTemp] = useState(0);
  const [Latidute, setLatidute] = useState(0);
  const [Longidute, setLongidute] = useState(0);
  const [Humidity, setHumidity] = useState(0);
  const [Wind, setWind] = useState(0);
  const [text, setText] = useState("");
  const [loading, setloading] = useState(false);
  const [cityNotFound, setcityNotFound] = useState(false);

  const apis = async () => {
    setloading(true);
    const url = "2164de72b53bb8dc677f6c50db79fb79";
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${url}&unit=Metric`;
    try {
      const res = await fetch(api);
      const data = await res.json();
      if (data.cod === 404) {
        setloading(false);
      }
      setCity(data.name || cityNotFound);
      setTemp(data.main.temp);
      setLatidute(data.coord.lon);
      setLongidute(data.coord.lat);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
    } catch (error) {
      console.log(error, "error");
      setcityNotFound("not found");
      setTemp(0);
      setLatidute(0);
      setLongidute(0);
      setHumidity(0);
      setWind(0)

    } finally {
      setloading(false);
    }
  };

  const searchHandle = (e) => {
    setText(e.target.value);
  };

  const keyDown = (e) => {
    if (e.key === "Enter") {
      apis();
    }
  };

  const searchIcon = () => {
    apis();
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="weather-app-container">
      <div className="weather-card">
        <div className="weather-header">
          <h2 className="weather-title">Weather Info</h2>
          <div className="search-bar">
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              onChange={searchHandle}
              value={text}
              onKeyDown={keyDown}
              placeholder="Search city"
            />
            <FaSearch className="search-icon" onClick={searchIcon} />
          </div>
        </div>

        <div className="weather-details">
          <img className="weather-image rounded" src={image} alt="Weather"  />
          <div className="temperature">{temper}&#8451;</div>
          <h1 className="city-name">{city}</h1>

          <div className="coordinates">
            <p>Latitude: {Latidute}</p>
            <p>Longitude: {Longidute}</p>
          </div>

          <div className="additional-info">
            <div className="info-item">
              <img src={humitidy} alt="Humidity" className="info-icon" />
              <p>Humidity: {Humidity}%</p>
            </div>
            <div className="info-item">
              <img src={air} alt="Wind" className="info-icon" />
              <p>Wind Speed: {Wind} km/h</p>
            </div>
          </div>
        </div>

        <div className="footer">Designed by Arulsiva</div>
      </div>
    </div>
  );
};

export default Wether;
