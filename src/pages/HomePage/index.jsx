import { useState } from 'react';
import { JourneyPicker } from '../../components/JourneyPicker';
import { JourneyDetail } from '../../components/JourneyDetail';
import { SelectedSeat } from '../../components/SelectedSteat';
import './style.css';
import { useNavigate } from "react-router";
import { SeatPicker } from '../../components/SeatPicker';

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
          <JourneyDetail journey={journey}/>
          {/* <SelectedSeat number={journey.autoSeat}/> */}
          <SeatPicker />

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
