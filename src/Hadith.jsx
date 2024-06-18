import React, { useEffect, useState } from 'react'
import './Hadith.css'
import isogLogo from "./assests/images/isog.png";

const Hadith = () => {
    const [hadith, setHadith] = useState();

    const getHadiths = async () => {
        try {
          const response = await fetch(
            `https://isog-prayer-times-server.vercel.app/api/hadiths`
          );
          const json = await response.json();
          setHadith(json.hadith);
        } catch (e) {
          console.log(e);
        }
      };

    useEffect(()=>{
        getHadiths()
    }, [])

  return (
    <div className='hadithContainerRoot'>
        <div className='bismala'>﷽</div>
    <div className='hadithContainer'>

        <div className='hadith'>
            {hadith}
        </div>
    </div>

    <img src={isogLogo} className='hadithISOGLogo'/>
    </div>
  )
}

export default Hadith