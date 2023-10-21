import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import '../styles/user_profile.css';
import userImage from '../assets/images/profile5.jpg'; 
import axios from 'axios';

const User_profile = () => {
    const navigate = useNavigate();

    const handleCheckButtonClick = () => {
        navigate('/homw');
        window.scrollTo(0, 0);
    };

    const email = sessionStorage.getItem("email");
    const token = sessionStorage.getItem('token');

    const [userData, setUserData] = useState('');
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/profile/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }) 
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    

    return (
        <Container>
            <div className="profile-box">
                <img src={userImage} alt="User Profile" className="profile-image" />
                
                <div className="user-info">
                    <div className="profile-box2">
                        <strong>First Name:</strong> {userData.first_name}<br />
                        <strong>Last Name:</strong> {userData.last_name}<br />
                        {/* <strong>Country:</strong> {userData.country}<br /> */}
                        <strong>Email:</strong> {userData.email}<br />
                        <strong>Booking Frequency:</strong> {userData.booking_frequency}
                        
                    </div>
                    <div>
                    <Button  onClick={handleCheckButtonClick}>Home</Button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default User_profile;
