import { Seat } from './Seat';
import './style.css';

export const SeatPicker = () => {
  return (
    <div className="seat-picker container">
      <h2>Vyberte sedadlo</h2>
      <div className="seats">
        <Seat number="1"/>
        <Seat number="5"/>
        <Seat number="23"/>
        <Seat number="35"/>
      </div>
    </div>

  )
}