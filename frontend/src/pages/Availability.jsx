import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container,Button, Row, Col } from 'reactstrap';

const Availability = () => {
    const flight_schedule_id = sessionStorage.getItem("flight_schedule_id");
    const flight_date = sessionStorage.getItem("flight_date");
    const arrival_time = sessionStorage.getItem("arrival_time");
    const departure_time = sessionStorage.getItem("departure_time");
    const aircraft_id = sessionStorage.getItem("aircraft_id");
    const flight_id = sessionStorage.getItem("flight_id");

    const navigate = useNavigate();
    const handleSelectSeatButtonClick = () => {
        navigate('/seat');
        window.scrollTo(0, 0); 
    };

    const [data1, setData] = useState(null);

    useEffect(() => {
        const availabilityData = {
            flight_schedule_id: flight_schedule_id,
            flight_date: flight_date,
            arrival_time: arrival_time,
            departure_time: departure_time,
            aircraft_id: aircraft_id,
            flight_id: flight_id,
        };
      
        axios.post('http://127.0.0.1:5000/available', availabilityData, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(resp => {
            setData(resp.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <section>

            <Container>
                {data1 && (
                    <div>
                        <h2>Flight Information</h2>
                        <p><strong>Flight Schedule ID:</strong> {data1.flight_schedule_id}</p>
                        <p><strong>Flight Date:</strong> {data1.flight_date}</p>
                        <p><strong>Arrival Time:</strong> {data1.arrival_time}</p>
                        <p><strong>Departure Time:</strong> {data1.departure_time}</p>
                        <p><strong>Aircraft ID:</strong> {data1.aircraft_id}</p>
                        <p><strong>Flight ID:</strong> {data1.flight_id}</p>
                    </div>
                )}
                <button className="btn-primary" onClick={handleSelectSeatButtonClick}>
                    Select Seat
                </button>
            </Container>

        </section>
    );
};

export default Availability;
