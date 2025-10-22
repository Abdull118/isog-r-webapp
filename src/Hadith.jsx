import React, { useEffect, useState } from 'react';
import './Hadith.css';
import isogLogo from "./assests/images/isog.png";
import { useFitText } from './hooks/useFitText'; 

const Hadith = () => {
  const [hadith, setHadith] = useState('');
  const [trigger, setTrigger] = useState(0);
  
  const [hadithRef, fontSize] = useFitText(400, trigger); 
  
  useEffect(() => {
    getHadiths();
  }, []);
  
  const getHadiths = async () => {
    try {
      const response = await fetch(`https://isog-prayer-times-server.vercel.app/api/hadiths`);
      const json = await response.json();
      setHadith(json.hadith);
      setTrigger(prev => prev + 1); 
    } catch (e) {
      console.log(e);
    }
  };
  

  return (
    <div className='hadithContainerRoot'>
      <div className='bismala'>﷽</div>
      <div className='hadithContainer'>
        <div
          ref={hadithRef}
          className='hadith'
          style={{ fontSize: `${fontSize}px` }}
        >
          {hadith}
        </div>
      </div>
      {/* <img src={isogLogo} className='hadithISOGLogo' /> */}
    </div>
  );
};

export default Hadith;
