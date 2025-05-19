import { Seat } from "../Seat"

export const SeatRow = ({ row }) => {
  return (
    <div className="seat-row">
      {row.map((seat) => (
        <Seat key={seat.number} number={seat.number} isOccupied={seat.isOccupied}/>
      ))}
    </div>
  )
}
