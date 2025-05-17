import './style.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";

export const ReservationPage = () => {
  const [ reservation, setReservation ] = useState(null)
  const { reservationId } = useParams()
  
  useEffect(() => {
    const fetchReservation = async () => {
      const response = await fetch(`https://apps.kodim.cz/daweb/leviexpress/api/reservation?id=${reservationId}`)
      const json = await response.json()
      setReservation(json.results)
    }
    fetchReservation()
  }, [])
  console.log(reservation)

  return (
    <div className="reservation container">
      {reservation &&
        <>
          <h2>Vaše e-jízdenka č. {reservation.reservationId}</h2>
          <div className="reservation__body">
            <div className="reservation__headings">
              <p>Datum cesty: </p>
              <p>Odjezd:</p>
              <p>Příjezd:</p>
              <p>Sedadlo:</p>
            </div>
            <div className="reservation__info">
              <p>{reservation.date}</p>
              <p>{reservation.fromCity.name}</p>
              <p>{reservation.toCity.name}</p>
              <p>{reservation.seatNumber}</p>
            </div>
          </div>
        </>
      }
    </div>
  );
};
