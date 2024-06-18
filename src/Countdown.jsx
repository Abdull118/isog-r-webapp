import moment from 'moment'
import React, { useEffect } from 'react'
import './Countdown.css'
import isogLogo from "./assests/images/isog.png";

const Countdown = ({countDownSeconds, countDownAthan, setMainPage, setCountDownPage}) => {
    
    useEffect(()=>{
    if(countDownSeconds == 0){
        setMainPage(true)
        setCountDownPage(false)
    }
    }, [countDownSeconds])


 
  return (

    <div className='countDownBackground'>
        <div className='overlay'></div>

        <div className='textContainer'>
        <div className='countDownTime'>{moment().format('h:mm A')}</div>

        <div className='countDownContainer'>
            <div>
                <div className='countDownSeconds'>{countDownSeconds}</div>
            </div>

            <div className='countDownText'>
                <div>SECONDS TO</div>
                <div>MAGHRIB</div>
                <div>ATHAN</div>
            </div>
        </div>
        </div>

        <img src={isogLogo}  className='countDownISOGLogo'/>
    </div>
  )
}

export default Countdown