import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardComponent from './components/DashboardComponent';
import SignUpComponent from './components/SignUpComponent';
import SignInComponent from './components/SignInComponent';

const App = () => {
  return (
   <Router>
    <div className='App'>
      <Routes>
          <Route path="/dashboard" element={<DashboardComponent />} />
          <Route path="/signup" element={<SignUpComponent />} />
          <Route path="/signin" element={<SignInComponent />} />
      </Routes>
    </div>
   </Router>
  );
};
export default App;
