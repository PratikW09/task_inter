import React, { useState } from 'react';
import "./signup.css"
import axios from "axios";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password:'',
    phone: '',
    gender: '',
    howDidYouHear: [],
    city: '',
    state: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? 
        (checked ? [...prevState[name], value] : prevState[name].filter(item => item !== value))
        : value
    }));


  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post('/auth/signup', formData);
      toast.success('Signup successful!');
      console.log('Data sent successfully:', response.data);
      localStorage.setItem('isAuthenticated', 'true');



      navigate('/dashboard');
      window.location.reload();
      
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      console.error('Error sending data:', error.response ? error.response.data : error.message);
      
    }
  };

  return (
    <div className="signup-form-container">
       <ToastContainer />

      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            pattern="[A-Za-z ]+"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]+"
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <label><input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male</label>
          <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
          <label><input type="radio" name="gender" value="Others" onChange={handleChange} /> Others</label>
        </div>
        <div className="form-group">
          <label>How did you hear about this?</label>
          <label><input type="checkbox" name="howDidYouHear" value="LinkedIn" onChange={handleChange} /> LinkedIn</label>
          <label><input type="checkbox" name="howDidYouHear" value="Friends" onChange={handleChange} /> Friends</label>
          <label><input type="checkbox" name="howDidYouHear" value="Job Portal" onChange={handleChange} /> Job Portal</label>
          <label><input type="checkbox" name="howDidYouHear" value="Others" onChange={handleChange} /> Others</label>
        </div>
        <div className="form-group">
          <label>City:</label>
          <select name="city" value={formData.city} onChange={handleChange} required>
            <option value="">Select City</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Ahmedabad">Ahmedabad</option>
          </select>
        </div>
        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            list="states"
            required
          />
          <datalist id="states">
            <option value="Gujarat" />
            <option value="Maharashtra" />
            <option value="Karnataka" />
          </datalist>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default SignupForm;
