import { useState } from 'react';
import { useNavigate } from "react-router";
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SeatPicker } from '../../components/SeatPicker';
import './style.css';

export const HomePage = () => {
  const [journey, setJourney] = useState(null)
  const navigate = useNavigate()

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData)
  }

  const handleBuy = async () => {
    const response = await fetch("https://apps.kodim.cz/daweb/leviexpress/api/reservation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        seat: journey.autoSeat,
        journeyId: journey.journeyId,
      })
    })
    const data = await response.json()
    const reservationId = data.results.reservationId
    navigate(`/reservation/${reservationId}`)
  }

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange}/>
      {journey &&
        <>
          <JourneyDetail journey={journey} />
          <SeatPicker seats={journey.seats} selectedSeat={journey.autoSeat} />

          <div className="controls container">
            <button className="btn btn--big" type="button" onClick={handleBuy}>
              Rezervovat
            </button>
          </div>
        </>
      }
    </main>
  );
};
