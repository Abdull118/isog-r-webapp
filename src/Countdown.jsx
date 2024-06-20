import moment from 'moment';
import React, { useEffect, useState } from 'react';
import './Countdown.css';
import isogLogo from "./assests/images/isog.png";

const Countdown = ({ countDownAthan, onCountDownComplete }) => {

    const [countDownSeconds, setCountDownSeconds] = useState(30);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountDownSeconds(prevSeconds => {
                console.log('Counting down:', prevSeconds);
                if (prevSeconds <= 1) {
                    clearInterval(countdownInterval);
                    onCountDownComplete()
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [setCountDownSeconds]);

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
                        <div>{countDownAthan}</div>
                        <div>ATHAN</div>
                    </div>
                </div>
            </div>
            <img src={isogLogo} className='countDownISOGLogo' alt='ISOG Logo' />
        </div>
    );
};

export default Countdown;
