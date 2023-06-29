import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import backgroundImage from './krava.jpg';

import CowList from './components/CowList';
import Maintenance from './components/Maintenance';
import MilkingStats from './components/MilkingStats';
import Notification from './components/Notification';

function App() {
  return (
    <Router>
      <div className="App" style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%'
      }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Mužnja krava</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/cows">Cow List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/maintenance">Maintenance</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/milking-stats">Milking Stats</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/notifications">Notifications</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="mt-5 pt-4"> 
          <Routes>
            <Route path="/cows" element={<CowList />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/milking-stats" element={<MilkingStats />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/" element={<CowList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
