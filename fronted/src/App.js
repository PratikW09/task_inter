import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignupForm from './pages/SignupForm';
import LoginForm from './pages/LoginForm';
import Homepage from './pages/Homepage';
import Logoutpage from './pages/Logoutpage';
import Errorpage from './pages/Errorpage';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import Navbar from './componet/Navbar';
import Footer from './componet/Footer';

function App() {
  
  return (
    
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/signup" element={<SignupForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/logout" element={<Logoutpage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard/adduser" element={<AddUser/>} />
          <Route path="*" element={<Errorpage/>} />
          
           
        </Routes>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;
