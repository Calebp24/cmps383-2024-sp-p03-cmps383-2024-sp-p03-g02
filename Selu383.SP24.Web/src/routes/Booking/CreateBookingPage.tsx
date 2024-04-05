import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"


interface CreateReservationDto {
	checkInDate?: Date;
	checkOutDate?: Date;
}

const ReserveRoomForm = () => {
  const [checkinDate, setCheckinDate] = useState(new Date().toISOString().slice(0, 10));
  const [checkoutDate, setCheckoutDate] = useState("");
  const navigate = useNavigate();

  const { hotelId, typeId } = useParams();

  useEffect(() => {
    // Calculate check-out date as two days from the current date
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    setCheckoutDate(twoDaysLater.toISOString().slice(0, 10));
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const url = `/api/reservations/hotel/${hotelId}/rtype/${typeId}`;
      fetch(url, {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify({
          checkInDate: new Date(checkinDate).toISOString(),
          checkOutDate: new Date(checkoutDate).toISOString()
        }),
      }).then(async x => {
        if(x.status == 200){
          navigate('/');
          window.location.reload();
        }else{
          throw new Error('Failed to make reservation');
        }
    });

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckInChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckinDate(e.target.value);
  };

  const handleCheckOutChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckoutDate(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="checkinDate">Check-in Date:</label>
      <input type="date" id="checkinDate" name="checkinDate" value={checkinDate} onChange={handleCheckInChange} />

      <label htmlFor="checkoutDate">Check-out Date:</label>
      <input type="date" id="checkoutDate" name="checkoutDate" value={checkoutDate} onChange={handleCheckOutChange} />

      <Button type="submit" style = {{ backgroundColor: '#FDBA74' }} className="btn-light">Reserve Room</Button>
    </form>
  );
};

export default ReserveRoomForm;