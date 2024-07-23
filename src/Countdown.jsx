import React, { useEffect, useState } from 'react';
import './Countdown.css';
import isogLogo from "./assests/images/isog.png";

const Countdown = ({ countDownAthan, onCountDownComplete, athanOrIqamah }) => {

    const [countDownSeconds, setCountDownSeconds] = useState(300);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCountDownSeconds(prevSeconds => {
                if (prevSeconds <= 1) {
                    clearInterval(countdownInterval);
                    onCountDownComplete();
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [onCountDownComplete]);

    const formatTime = (totalSeconds) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='countDownBackground'>
            <div className='overlay'></div>
            <div className='textContainer'>
                <div className='countDownTime'>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                <div className='countDownContainer'>
                    <div>
                        <div className='countDownSeconds'>-{formatTime(countDownSeconds)}</div>
                    </div>
                    <div className='countDownText'>
                        <div>{formatTime(countDownSeconds) > '0:59' ? 'MINUTES' : 'SECONDS' } TO</div>
                        <div className='countDownAthanName'>{countDownAthan}</div>
                        <div>{athanOrIqamah}</div>
                    </div>
                </div>
            </div>
            <img src={isogLogo} className='countDownISOGLogo' alt='ISOG Logo' />
        </div>
    );
};

export default Countdown;
