import React, { useState, useEffect } from 'react';
import './Ramadan.css';
import ramadanCalendar from "./assests/images/ramadanCalendar.png";

const Ramadan = ({ currentHijriDay, maghribAthan12Hr, fajrAthan }) => {
  const [ramadanHero, setRamadanHero] = useState(true);
  const [ramadanDownload, setRamadanDownload] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRamadanHero(prev => !prev);
      setRamadanDownload(prev => !prev);
    }, 30000); // Switch every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      {ramadanHero && (
        <div className='ramadanBackground'>
          <div>Day: {currentHijriDay}</div>
          <div className='fastingSection'>
            <div className='suhoorSection'>
              <div>Suhoor</div>
              <div>{fajrAthan}</div>
            </div>
            <div className='iftarSection'>
              <div>Iftar</div>
              <div>{maghribAthan12Hr}</div>
            </div>
          </div>
        </div>
      )}

      {ramadanDownload && <img src={ramadanCalendar} alt="Ramadan Calendar" />}
    </>
  );
};

export default Ramadan;
