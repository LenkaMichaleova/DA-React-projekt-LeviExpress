import React, { useEffect, useState } from 'react';
import './style.css';

const CityOptions = ({cities}) => (
  <>
    <option value="">Vyberte</option>
    {cities.map((city) => 
      <option key={city.code} value={city.code}>{city.name}</option>
    )}
  </>
)

const DateOption = ({dates}) => (
  <>
    <option value="">Vyberte</option>
    {dates.map((date) => 
      <option key={date.dateCs} value={date.dateCs}>{date.dateBasic}</option>
    )}
  </>
)

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState("")
  const [toCity, setToCity] = useState("")
  const [date, setDate] = useState("")

  const [cities, setCities] = useState([])
  const [dates, setDates] = useState([])

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/cities")
      const json = await response.json()
      setCities(json.results)
    }
    fetchCities()

    const fetchDates = async() => {
      const response = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/dates")
      const json = await response.json()
      setDates(json.results)
    }
    fetchDates()
  }, [])

  const handleSubmit= (event) => {
    event.preventDefault()
    console.log("odesílám formulář s cestou")
    console.log("z: " + fromCity)
    console.log("do: " + toCity)
    console.log("kdy: " + date)
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
            <DateOption dates={dates}/>
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
