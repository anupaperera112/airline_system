import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const Reports = () => {
    const [reportData, setReportData] = useState({flight_no: '', date1:'', date2:'', destination:'', departureLocation:'', arrivalLocation:''});
    
    const [passengers1, setPassengers1] = useState([]);
    const [passengers2, setPassengers2] = useState([]);
    const [passengers3, setPassengers3] = useState([]);

    const [showPassengers1, setShowPassengers1] = useState(false);
    const [showPassengers2, setShowPassengers2] = useState(false);
    const [showPassengers3, setShowPassengers3] = useState(false);

    const [pastFlight, setPassFlight] = useState([]);
    const [showPassFlight, setShowPassFlight] = useState(false);

    const [passengerCount, setPassengerCount] = useState(0);
    const [showPassengerCount, setShowPassengerCount] = useState(false);


    const handleChange = e =>{
        setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }
    
    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    const goHomeButton = () => {
            navigate('/home');      
        window.scrollTo(0, 0); 
    };

    const handlePassengers_above_18 = () => {
        const sendReportData = {
            flight_no: reportData.flight_no,
        };
        axios.post('http://127.0.0.1:5000/passengers_above_18', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
              alert("Report genarate Successfully");
              setPassengers1(response.data);
              setShowPassengers1(true);
              setShowPassengers2(false);
              setShowPassengers3(false);
              console.log(response.data);

            }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
              setShowPassengers1(false);
            }
          });
      };

      const handlePassengers_below_18 = () => {
        const sendReportData = {
            flight_no: reportData.flight_no,

        };
        axios.post('http://127.0.0.1:5000/passengers_below_18', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setPassengers2(response.data);
                setShowPassengers1(false);
                setShowPassengers2(true);
                setShowPassengers3(false);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
            }
          });
      };

      const handlePassengersList = () => {
        const sendReportData = {
            flight_no: reportData.flight_no,

        };
        axios.post('http://127.0.0.1:5000/passengers_list', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setPassengers3(response.data);
                setShowPassengers1(false);
                setShowPassengers2(false);
                setShowPassengers3(true);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
            }
          });
      };
    
      const handleNumber_of_passengers_for_dest_range = () => {
        const sendReportData = {
            date1: reportData.date1,
            date2: reportData.date2,
            destination: reportData.destination,
        };
        axios.post('http://127.0.0.1:5000/number_of_passengers_for_dest_range', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setPassengerCount(response.data);
                setShowPassengerCount(true);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No passenger list found");
            }
          });
      };


      const handlepast_flight = () => {
        const sendReportData = {
            departureLocation: reportData.departureLocation,
            arrivalLocation: reportData.arrivalLocation,

        };
        axios.post('http://127.0.0.1:5000/past_flight', sendReportData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => {
            if(response.status===201){
                alert("Report genarate Successfully");
                setPassFlight(response.data);
                setShowPassFlight(true);
              }
          })
          .catch(error => {
            if(error.response.status===401){
              alert("No flights found");
            }
          });
      };

    return (
        <section>
            
            <Container style={{ backgroundColor: '#f0f0f0' }}>
                <form className="reservation-form">
                    <h3>Passenger list age above 18</h3>
                    <div className="form-group">
                        <label htmlFor="departure-date">Enter flight Number here:</label>
                        <input type="text" id="flight-number" name="flight_no" required className="form-control" onChange={handleChange}/>                                    </div>
    
                </form>
                <button className="btn-primary" onClick={handlePassengers_above_18}> Get Report </button>
                {setShowPassengers1 && (
                    <div>
                    <h1>Passenger List</h1>   
                    {passengers1.length > 0 && (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Passenger Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passengers1.map(row => (
                            <tr key={row[0]}>
                              {row.map((cell, index) => (
                                <td key={index}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
   
            </Container>
            <br />
            <Container style={{ backgroundColor: '#f0f0f0' }}>
                <form className="reservation-form">
                    <h3>Passenger list age below 18</h3>
                    <div className="form-group">
                        <label htmlFor="departure-date">Enter flight Number here:</label>
                        <input type="text" id="flight-number" name="flight_no" required className="form-control" onChange={handleChange}/>                                    </div>
    
                </form>
                <button className="btn-primary" onClick={handlePassengers_below_18}> Get Report </button>
                {setShowPassengers2 && (
                    
                    <div>
                    <h1>Passenger List</h1>   
                    {passengers2.length > 0 && (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Passenger Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passengers2.map(row => (
                            <tr key={row[0]}>
                              {row.map((cell, index) => (
                                <td key={index}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
   
            </Container>
            <br />
            <Container style={{ backgroundColor: '#f0f0f0' }}>
                <form className="reservation-form">
                    <h3>All passenger list</h3>
                    <div className="form-group">
                        <label htmlFor="departure-date">Enter flight Number here:</label>
                        <input type="text" id="flight-number" name="flight_no" required className="form-control" onChange={handleChange}/>                                    </div>
    
                </form>
                <button className="btn-primary" onClick={handlePassengersList}> Get Report </button>
                {setShowPassengers3 && (
                    
                    <div>
                    <h1>Passenger List</h1>   
                    {passengers3.length > 0 && (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Passenger Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {passengers3.map(row => (
                            <tr key={row[0]}>
                              {row.map((cell, index) => (
                                <td key={index}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
   
            </Container>
            <br />
            <Container style={{ backgroundColor: '#f0f0f0' }}>
                <form className="reservation-form">
                    <h3>for a given destination passenger count</h3>
                    <div className="form-group">
                        <label htmlFor="departure-date">Enter destination here:</label>
                        <select id="arrival-location" name="destination" required className="form-control" onChange={handleChange}>
                            <option value="DEL">India, new Delhi</option>
                            <option value="BOM">India, Mumbai</option>
                            <option value="MAA">India, Chennai</option>
                            <option value="CGK">Indonesia, Jakarta</option>
                            <option value="DPS">Indonesia, Bali</option>
                            <option value="SIN">Singapore, Changi</option>
                            <option value="BIA">Sri Lanka, Colombo</option>
                            <option value="HRI">Sri Lanka, Hambanthota</option>
                            <option value="BKK">Thailand, Bangkok, BKK</option>
                            <option value="DMK">Thailand, Bangkok, DMK</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="reservation-form">
                        <label htmlFor="departure-date">From:</label>
                        <input type="date" id="departure-date" name="date1" required className="form-control" onChange={handleChange}/>
                    </div>
                    <div className="reservation-form">
                        <label htmlFor="departure-date">To:</label>
                        <input type="date" id="departure-date" name="date2" required className="form-control" onChange={handleChange}/>
                    </div>
    
                </form>
                <button className="btn-primary" onClick={handleNumber_of_passengers_for_dest_range}> Get Report </button>
                {setShowPassengerCount && (
                    
                    <div>
                    <h1>Passenger Count</h1>   
                    Number of passengers for destination {reportData.destination} between {reportData.date1} and {reportData.date2}: {passengerCount}
                  </div>
                )}
   
            </Container>
            <br />
            <Container style={{ backgroundColor: '#f0f0f0' }}>
                <form className="reservation-form">
                    <h3>All passenger list</h3>
                    <div className="form-group">
                        <label htmlFor="departure-date">Enter destination here:</label>
                        <select id="arrival-location" name="arrivalLocation" required className="form-control" onChange={handleChange}>
                            <option value="DEL">India, new Delhi</option>
                            <option value="BOM">India, Mumbai</option>
                            <option value="MAA">India, Chennai</option>
                            <option value="CGK">Indonesia, Jakarta</option>
                            <option value="DPS">Indonesia, Bali</option>
                            <option value="SIN">Singapore, Changi</option>
                            <option value="BIA">Sri Lanka, Colombo</option>
                            <option value="HRI">Sri Lanka, Hambanthota</option>
                            <option value="BKK">Thailand, Bangkok, BKK</option>
                            <option value="DMK">Thailand, Bangkok, DMK</option>
                            {/* Add more options as needed */}
                        </select>
                        <label htmlFor="departure-date">Enter Departure Location here:</label>
                        <select id="arrival-location" name="departureLocation" required className="form-control" onChange={handleChange}>
                            <option value="DEL">India, new Delhi</option>
                            <option value="BOM">India, Mumbai</option>
                            <option value="MAA">India, Chennai</option>
                            <option value="CGK">Indonesia, Jakarta</option>
                            <option value="DPS">Indonesia, Bali</option>
                            <option value="SIN">Singapore, Changi</option>
                            <option value="BIA">Sri Lanka, Colombo</option>
                            <option value="HRI">Sri Lanka, Hambanthota</option>
                            <option value="BKK">Thailand, Bangkok, BKK</option>
                            <option value="DMK">Thailand, Bangkok, DMK</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                </form>
                <button className="btn-primary" onClick={handlepast_flight}> Get Report </button>
                {setShowPassFlight && (
                    
                    <div>
                    <h1>Flight List</h1>   
                    {pastFlight.length > 0 && (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Flight ID</th>
                            <th>Flight Schedule ID</th>
                            <th>Flight Date</th>
                            <th>Flight Status</th>
                            <th>Origin airport</th>
                            <th>Destination airport</th>
                            <th>Passenger Count</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pastFlight.map(row => (
                            <tr key={row[0]}>
                              {row.map((cell, index) => (
                                <td key={index}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
   
            </Container>

        </section>
    );
};

export default Reports;
