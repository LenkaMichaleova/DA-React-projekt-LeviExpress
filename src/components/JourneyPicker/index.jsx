import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({cities}) => {
  return(
    <>
      <option value="">Vyberte</option>
      {cities.map((city) => 
        <option key={city.code} value={city.code}>{city.name}</option>
      )}
    </>
  )
}

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [date, setDate] = useState("")
  const [cities, setCities] = useState([])

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/cities")
      const json = await response.json()
      setCities(json.results)
    }
    fetchCities()
    // setCities([{ name: 'Praha', code: 'CZ-PRG' }, { name: 'Brno', code: 'CZ-BRQ' },])
  }, [])

  const handleSubmit= (event) => {
    event.preventDefault()
    // console.log("odesílám formulář s cestou")
    // console.log("z: " + fromCity)
    // console.log("do: " + toCity)
    // console.log("kdy: " + date)
    // console.log("výběr ze seznamu měst: " + cities[0].name)
  }
  
  return (
  <div className="journey-picker container">
    <h2 className="journey-picker__head">Kam chcete jet?</h2>
    <div className="journey-picker__body">
      <form className="journey-picker__form" onSubmit={handleSubmit}>
        <label>
          <div className="journey-picker__label">Odkud:</div>
          <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
            <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Kam:</div>
          <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
            <CityOptions cities={cities}/>
          </select>
        </label>
        <label>
          <div className="journey-picker__label">Datum:</div>
          <select value={date} onChange={(e) => setDate(e.target.value)}>
            <option value="">Vyberte</option>
            <option value="datum01">Datum 01</option>
            <option value="datum02">Datum 02</option>
            <option value="datum03">Datum 03</option>
            <option value="datum04">Datum 04</option>
            <option value="datum05">Datum 05</option>
          </select>
        </label>
        <div className="journey-picker__controls">
          <button 
            className="btn" 
            type="submit"
          > 
            Vyhledat spoj
          </button>
        </div>
      </form>
      <img className="journey-picker__map" src="/map.svg" />
    </div>
  </div>
  );
};
