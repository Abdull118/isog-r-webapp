import React from 'react' 
import isogLogo from "./assests/images/isog.png";
import QRCode from 'qrcode.react';


const Announcement = () => {
    const url = 'https://isofg.ca';
  return (
    <div className='hadithContainerRoot'>
    <div className='bismala'>﷽</div>
<div className='hadithContainer'>

    <div className='announcementsContainer'>
        <div>
         Please donate generously for YOUR Masjid
         </div>
         <div>
         For E-Transfers: <br/>
         donations.isofg@gmail.com
        </div>
        <div>
         For Other Options: <br/>
         <QRCode value={url} className='QRCode'/>
         </div>
    </div>
</div>

<img src={isogLogo} className='hadithISOGLogo'/>
</div>
  )
}

export default Announcement