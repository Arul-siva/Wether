import React, { useEffect, useRef } from "react";
import suncloud from "../components/images/suncloud.png";
import humitidy from "../components/images/humitidy.png";
import air from "../components/images/air.png";
import { FaSearch } from "react-icons/fa";

import { useState } from "react";
const Wether = () => {
    const inputRef = useRef()
  const [image, setImage] = useState(suncloud);
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
      console.log(data);
      if(data.cod === 404){
        console.log("error");
        setloading(false)
      }
      setCity(data.name  || cityNotFound);
      setTemp(data.main.temp)
      setLatidute(data.coord.lon)
      setLongidute(data.coord.lat)
      setHumidity(data.main.humidity)
      setWind(data.wind.speed)
    } catch (error) {
      console.log(error, "error");
      setcityNotFound("not fount")
    } finally {
      setloading(false);
    }
  };

  const searchHandle = async (e) => {
    setText(e.target.value);
  };

  const keyDown = (e) => {
    if (e.key === "Enter") {
      apis();
    }
  };
  function searchIcon (){
    apis();
  }
useEffect(()=> 
{
   inputRef.current.focus();
   
},[ ])

  return (
    <>
      <div className="card w-25 mx-auto align-items-center  p-3">
      <h2 className="py-3">weather info</h2>
       <div className="d-flex  w-75 position-relative">
       <input 
           ref={inputRef}
          type="text"
          className="w-100 p-2 input"
          onChange={searchHandle}
          value={text}
          onKeyDown={keyDown}
        /><FaSearch className="searchicon"  onClick={searchIcon}/>
       </div>

        <img className="img-fluid mt-3" src={image} alt="Title" />
        <div className="w-100 p-0 m-0 text-center ">
          <h5>{temper}&#x2103;</h5>
          <h1 className="card-title py-3">{ city} </h1>
          <div className="">
            <div className="">
              <p className="mx-2">Latidute : {Latidute}</p>
              <p className="mx-2">Longidute :{Longidute}</p>
            </div>
            <div className="ca">
              <div className="">
                <img src={humitidy} alt="" className="img-fluid w-25" />
                <p>Humidity : {Humidity}%</p>
              </div>
              <div className="">
                <img src={air} alt="" className="img-fluid w-25" />
                <p>Wind speed : {Wind} km/h</p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-2 text-secondary">Designed by root</div>
      </div>
    </>
  );
};

export default Wether;
