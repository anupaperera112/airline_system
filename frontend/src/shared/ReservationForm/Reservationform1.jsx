import React ,{useState}from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './ReservationForm.css';
import axios from 'axios';

// should add required fields

const ReservationForm1 = () => {
  const navigate = useNavigate(); 

  const [trip, setTrip] = useState({get_date: '',flight_number: '' });
  const [schedule, setSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleChange = e => { setTrip(prev => ({ ...prev, [e.target.name]: e.target.value}))}

  const navigateto = () => {
      navigate('/seat');
      window.scrollTo(0, 0);   
  };


  const goHomeReports = () => {
    navigate('/reports');      
    window.scrollTo(0, 0); 
  };
  const goHomeTicket = () => {
    navigate('/ticket');      
    window.scrollTo(0, 0); 
  };

  const setFlight = ()=> {
    sessionStorage.setItem("flight_schedule_id",trip.flight_number);
   
  };

  const handleCombinedClick = () => {
    setFlight();
    navigateto();
  };

  const handleFlight = () => {
    const tripData = {
        get_date: trip.get_date,
    };

    axios.post('http://127.0.0.1:5000/get_flight_schedule', tripData,{
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      console.log(response.data);
      setSchedule(response.data);
      setShowSchedule(true);
      

    })
    .catch(error => {
      // Handle errors from the backend (e.g., display an error message)
      console.error(error);

      if(error.response.status===401){
        alert("there are no flights available for this route");
        // navigate('/home');
        // window.scrollTo(0, 0);
      }
    });
  };
  
  return (
    <div className="reservation-form-container">
      <Container>
        <br />
        <Row className="justify-content-center align-items-center form-row">
            <Row>
                <form className="reservation-form">
                  <h3>Departure</h3>
                  <div className="form-group">
                    <label htmlFor="departure-date">Date:</label>
                    <input type="date" id="departure-date" name="get_date" required className="form-control" onChange={handleChange}/>
                  </div>
                  
                </form>
            </Row>

            <Row>
                <Col lg="12" className="text-right">      
                <button className="btn-primary" onClick={handleFlight}> Check </button>
                {/* <button className="btn-primary" onClick={goHomeTicket}> ticket </button> */}

                </Col>
            </Row>
            {showSchedule && (
                        <Row>
                            <div style={{ textAlign: 'center' }}>
                                <h1 style={{ color: 'white' }}>Flight Schedule</h1>
                                <table style={{backgroundColor: 'white', borderRadius: '10px', margin: 'auto'}}>
                                    <thead>
                                        <tr>
                                            <th>Flight Number</th>
                                            <th>Origin</th>
                                            <th>Destination</th>
                                            <th>Departure Time</th>
                                            <th>Arrival Time</th>
                                            
                                            <th>flight status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map(row => (
                                            <tr key={row[0]}>
                                                {row.map((cell, index) => (
                                                    <td key={index}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <br />
                                <h1> So where do you want to go</h1>
                                <form className="reservation-form">
                                    <h3>Departure</h3>
                                    <div className="form-group">
                                        <label htmlFor="departure-date">Enter flight Number here:</label>
                                        <input type="text" id="flight-number" name="flight_number" required className="form-control" onChange={handleChange} />                                    </div>
                  
                                </form>
                                <button className="btn-primary" onClick={handleCombinedClick}> BOOK NOW </button>
                            </div>
                            
                        </Row>
                    )}
        </Row>
      </Container>
    </div>
  );
};

export default ReservationForm1;
