import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import DroughtPage from './components/DroughtMap.js';
import WeatherEvents from './components/WeatherEvents.js';
import Contact from './components/Contact.js';
import ChatBot from './components/ChatBot.js';
import WorksCited from './components/WorksCited.js';
import Map from './components/Map.js';

function Home() {
  return (
    <>
      <img
        src="https://foreignpolicy.com/wp-content/uploads/2021/04/Soybeans-Indiana-Farm-2021-03-31T171500Z_335959827_RC2HMM9KWIHS_RTRMADP_3_USA-CROPS.jpg"
        className="full-page-image"
        alt="Soybean Farm"
      />
      <div className="overlay-text">
        <h1>Harness the Skies,</h1>
        <h1>Master the Earth:</h1>
        <p>Empowering the agricultural industry with NASA’s Data-Driven Insights</p>
      </div>
      <section className="section-image"></section>
      <section className="section-white">
        <div className="left-content">
          <div className="content-box info-card">
            <h2>Our vision</h2>
            <p>
            The vision of the AgriSphere platform is to leverage data-driven insights from NASA to support farmers, agricultural professionals, and environmentalists through informed decision-making regarding conditions of drought, water management, and farming that is sustainable. We aspire to build the foundation with necessary information to mitigate climate change in agriculture by providing real-time drought monitoring, predictive analytics, and personalized insights to users. By harnessing the power of AI in our own AgriAI chatbot, anyone can be comfortable with using our platform as it provides personalized insights from NASA's Datasets. 
            </p>
          </div>
          <div className="content-box info-card">
            <h2>How to use the website</h2>
            <p>
            Users can easily navigate the website by utilizing the navigation bar to access different sections, such as the homepage, and other miscellaneous pages. For any questions regarding the site or general inquiries about agriculture, they can interact with the AgriAI chatbot, which is ready to assist with any questions.
            </p>
          </div>
        </div>
        <div className="right-content">
          <video
            src="/anim.mov"
            width="100%"
            height="auto"
            loop
            muted
            autoPlay
            playsInline
            className="right-video"
          >
            Your browser does not support the video tag.
          </video>
          <div className="video-subtitle">
      <p>NASA's advanced satellite imagery for Equivalent Potential Vorticity (EPV)</p>
    </div>
        </div>
        <ChatBot />
      </section>
    </>
  );
}

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo-container">
            <img
              src="https://i.postimg.cc/LXshh7f1/nasa-modified-1.png"
              className="navbar-logo"
              alt="NASA Modified Logo"
            />
            <span className="logo-text">AgriSphere</span>
          </div>

          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={toggleDropdown}>
                Visualizations {dropdownOpen ? '▲' : '▼'}
              </button>
              {dropdownOpen && (
                <ul className="dropdown-content">
                  <li>
                    <Link to="/thermal-anomalies" onClick={closeDropdown}>Wildfire Distributions</Link>
                  </li>
                  <li>
                    <Link to="/weather-events" onClick={closeDropdown}>Weather Events</Link>
                  </li>
                  <li>
                    <Link to="/precipitation" onClick={closeDropdown}>Precipitation</Link>
                  </li>
                  <li>
                    <Link to="/soil" onClick={closeDropdown}>Soil Moisture</Link>
                  </li>
                  <li>
                    <Link to="/wind" onClick={closeDropdown}>Wind Speed</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/cited">Resources</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thermal-anomalies" element={<DroughtPage />} />
          <Route path="/weather-events" element={<WeatherEvents />} />
          <Route path="/precipitation" element={<Map src="precipitation.png" />} />
          <Route path="/soil" element={<Map src="soilmoisture.png" />} />
          <Route path="/wind" element={<Map src="wind.png" />} />
          <Route path="/cited" element={<WorksCited />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <footer className="footer">
          <p>© 2024 AgriSphere. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
