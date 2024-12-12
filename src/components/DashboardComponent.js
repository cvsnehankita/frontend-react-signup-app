import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
const DashboardComponent = () => {
    const location = useLocation();
    const { uname } = location.state || {};
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/signin");
      };
    
    return (
        <div className="container">
            <header>
                <h2>Hi {uname ? uname : ""},  Welcome to the Team!</h2>
                <p>Let's start building amazing things together!</p>
            </header>
            </div>
    )
};
export default DashboardComponent;