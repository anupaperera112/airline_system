import React, { useState } from 'react';
import { Container} from 'reactstrap';
import axios from 'axios';

const PastFlight = () => {
    const [reportData, setReportData] = useState({departureLocation:'', arrivalLocation:''});

    const [pastFlight, setPassFlight] = useState([]);
    const [showPassFlight, setShowPassFlight] = useState(false);

    const handleChange = e =>{
        setReportData(prev => ({ ...prev, [e.target.name]: e.target.value}))
      }

      const handlepast_flight = () => {
        const sendReportData = {
            departureLocation: reportData.departureLocation,
            arrivalLocation: reportData.arrivalLocation,

        };
        setPassFlight([]);
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
    
    return(
        <Container style={{ backgroundColor: '#f0f0f0' }}>
        <form className="reservation-form">
            <h3>past flight</h3>
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
    );
};

export default PastFlight;