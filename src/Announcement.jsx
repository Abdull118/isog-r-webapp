import React from 'react' 
import isogLogo from "./assests/images/isog.png";
import QRCode from 'qrcode.react';


const Announcement = () => {
    const url = 'https://isofg.ca';
    const eTransfer = 'https://isofg.ca/etransfer';
  return (
    <div className='hadithContainerRoot'>
    <div className='bismala'>﷽</div>
<div className='hadithContainer'>

    <div className='announcementsContainer'>
        <div>
         Please donate generously for YOUR Masjid
         </div>
         <div className='QRCodeContainer'>
                <div>
                For E-Transfers: <br/>
                <QRCode value={eTransfer} className='QRCode'/>
                </div>
                <div>
                For Other Options: <br/>
                <QRCode value={url} className='QRCode'/>
                </div>
         </div>
         
    </div>
</div>

<img src={isogLogo} className='hadithISOGLogo'/>
</div>
  )
}

export default Announcement