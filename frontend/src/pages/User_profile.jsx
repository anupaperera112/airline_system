import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'reactstrap';
import '../styles/user_profile.css';
import userImage from '../assets/images/profile5.jpg'; 

const User_profile = () => {
    const navigate = useNavigate();

    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        country: 'USA',
        email: 'john.doe@example.com',
        bookingFrequency: 'Weekly',
    };

    const handleCheckButtonClick = () => {
        navigate('/user');
        window.scrollTo(0, 0);
    };

    return (
        <Container>
            <div className="profile-box">
                <img src={userImage} alt="User Profile" className="profile-image" />
                
                <div className="user-info">
                    <div className="profile-box2">
                        <strong>First Name:</strong> {userData.firstName}<br />
                        <strong>Last Name:</strong> {userData.lastName}<br />
                        <strong>Country:</strong> {userData.country}<br />
                        <strong>Email:</strong> {userData.email}<br />
                        <strong>Booking Frequency:</strong> {userData.bookingFrequency}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default User_profile;
