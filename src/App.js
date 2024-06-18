import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import moment from "moment/moment";
import isogLogo from "./assests/images/isog.png";
import vector from "./assests/images/Vector.png";
import cloud from "./assests/images/cloud.png";
import Hadith from "./Hadith";
import Countdown from "./Countdown";

// use effect comes last
function App() {
  const [mainPage, setMainPage] = useState(false)
  const [hadithPage, setHadithPage] = useState(false)
  const [countDownPage, setCountDownPage] = useState(true)
  const [countDownSeconds, setCountDownSeconds] = useState(0);
  const [countDownAthan, setCountDownAthan] = useState();

  const [clock, setClock] = useState();
  const [clockAP, setClockAP] = useState();
  const [message, setMessage] = useState();
  const [messageHeader, setMessageHeader] = useState();
  const [fajrAthan, setFajrAthan] = useState();
  const [dhurAthan, setDhurAthan] = useState();
  const [asrAthan, setAsrAthan] = useState();
  const [maghribAthan, setMaghribAthan] = useState();
  const [ishaAthan, setIshaAthan] = useState();

  const [fajrPrayer, setFajrPrayer] = useState();
  const [dhurPrayer, setDhurPrayer] = useState();
  const [asrPrayer, setAsrPrayer] = useState();
  const [maghribPrayer, setMaghribPrayer] = useState();
  const [ishaPrayer, setIshaPrayer] = useState();

  const [shuruq, setShuruq] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [currentCustomDate, setCurrentCustomDate] = useState();
  const [momentDate, setMomentDate] = useState();
  const [currentHijriDay, setCurrentHijriDay] = useState();
  const [currentHijriMonth, setCurrentHijriMonth] = useState();
  const [currentHijriYear, setCurrentHijriYear] = useState();
  const [weatherValue, setWeatherValue] = useState();
  const [weatherText, setWeatherText] = useState();

  const [hadith, setHadith] = useState();
  const [nextPrayer, setNextPrayer] = useState();

  const getHijriDate = async () => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/gToH?=${currentDate}`
      );
      const json = await response.json();
      setCurrentHijriDay(json.data.hijri.day);
      setCurrentHijriMonth(json.data.hijri.month.ar);
      setCurrentHijriYear(json.data.hijri.year);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup
  }, []);

  const updateTime = () => {
    setClock(moment().format("h:mm"));
    setClockAP(moment().format("A"));
  };

  const getAthan = async () => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=Guelph&country=Canada&method=2`
      );
      const json = await response.json();
      setFajrAthan(convertTo12Hour(json.data.timings.Fajr));
      setShuruq(addMinutesToTime(json.data.timings.Sunrise, 15));
      setDhurAthan(convertTo12Hour(json.data.timings.Dhuhr));
      setAsrAthan(convertTo12Hour(json.data.timings.Asr));
      setMaghribAthan(convertTo12Hour(json.data.timings.Maghrib));
      setIshaAthan(convertTo12Hour(json.data.timings.Isha));
      convertTo12Hour(json.data.timings.Sunrise);
    } catch (error) {
      console.log(error);
    }
  };

  const getPrayerTimes = async () => {
    try {
      const response = await fetch(
        `https://isog-prayer-times-server.vercel.app/api/prayers`
      );
      const json = await response.json();
      setFajrPrayer(json.fajr);
      setDhurPrayer(json.dhuhr);
      setAsrPrayer(json.asr);
      setMaghribPrayer(json.maghrib);
      setIshaPrayer(json.isha);
    } catch (e) {
      console.log(e);
    }
  };

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

  const getNextPrayer = async () => {
    try {
      const response = await fetch(
        "https://isog-prayer-times-server.vercel.app/api/nextPrayers",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            // Add other headers if needed
          },
          body: JSON.stringify({
            // Your PUT request payload (if necessary)
            // Example: { key: 'value' }
          }),
        }
      );
      const json = await response.json();
      setNextPrayer(json.nextPrayer);
    } catch (e) {
      console.log(e);
    }
  };

  function convertTo12Hour(oldFormatTime) {
    var oldFormatTimeArray = oldFormatTime.split(":");

    var HH = parseInt(oldFormatTimeArray[0]);
    var min = oldFormatTimeArray[1];

    var AMPM = HH >= 12 ? "PM" : "AM";
    HH = HH % 12;
    HH = HH ? HH : 12;
    var hours = HH < 10 ? "0" + HH : HH;

    var newFormatTime = hours + ":" + min;
    return newFormatTime;
  }

  const addMinutesToTime = (timeString, minutesToAdd) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + minutesToAdd);
    const newHours = date.getHours().toString().padStart(2, "0");
    const newMinutes = date.getMinutes().toString().padStart(2, "0");

    return `${newHours}:${newMinutes}`;
  };

  const getDate = () => {
    var today = new Date(),
      date =
        today.getMonth() +
        1 +
        "-" +
        today.getDate() +
        "-" +
        today.getFullYear();
    setCurrentCustomDate(date);
    setCurrentDate(date);
  };

  const momentGetDate = () => {
    setMomentDate(moment().format("ddd MMMM D, YYYY"));
  };

  const [announcements, setAnnouncements] = useState([]);

  const getAnnouncements = async () => {
    try {
      const response = await fetch(
        `https://isog-prayer-times-server.vercel.app/api/announcements`
      );
      const data = await response.json();
      setAnnouncements(data.annoucements);
    } catch (e) {}
  };

  const [timeUntilNextPrayerHrs, setTimeUntilNextPrayerHrs] = useState("");

  const [timeUntilNextPrayerMin, setTimeUntilNextPrayerMin] = useState("");

  useEffect(() => {
    if (clock && nextPrayer) {
      calculateTimeUntilNextPrayer();
    }
  }, [
    clock,
    nextPrayer,
    fajrPrayer,
    dhurPrayer,
    asrPrayer,
    maghribAthan,
    ishaPrayer,
  ]);

  const calculateTimeUntilNextPrayer = () => {
    const currentTime = moment(clock, "h:mm A");
    let nextPrayerTime;

    switch (nextPrayer) {
      case "fajr":
        nextPrayerTime = moment(fajrPrayer + " AM", "HH:mm A");
        break;
      case "dhuhr":
        nextPrayerTime = moment(dhurPrayer + " PM", "HH:mm A");
        break;
      case "asr":
        nextPrayerTime = moment(asrPrayer + " PM", "HH:mm A");
        break;
      case "maghrib":
        nextPrayerTime = moment(maghribAthan, "HH:mm A");
        break;
      case "isha":
        nextPrayerTime = moment(ishaPrayer, "h:mm A");
        break;
      default:
        return;
    }

    // Set the date of nextPrayerTime to today's date
    nextPrayerTime.set({
      year: currentTime.year(),
      month: currentTime.month(),
      date: currentTime.date(),
    });

    // If the next prayer time is before the current time, it means the next prayer is the next day
    if (nextPrayerTime.isBefore(currentTime)) {
      nextPrayerTime.add(1, "days");
    }

    const duration = moment.duration(nextPrayerTime.diff(currentTime));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    setTimeUntilNextPrayerHrs(hours);
    setTimeUntilNextPrayerMin(minutes);
    console.log(moment().format('h:mm A'), nextPrayerTime)
  };

  function messageSwapper() {
    setMessage((prevMessage) => {
      if (prevMessage === announcements) {
        if(messageHeader == "Today's Message"){
          setMessageHeader("Hadith");
        }else{
          setMessageHeader("Today's Message")
        }
        return hadith;
      } else if (prevMessage === hadith) {
        setMessageHeader("Today's Message");
        return announcements;
      }
    });
  }
//   const [testAthanTime, setTestAthanTime] = useState('');

//   const checkForAthan = () => {
//     const currentTime = new Date();
//     const athanTimes = [
//         { name: 'Fajr', time: fajrAthan },
//         { name: 'Dhuhr', time: dhurAthan },
//         { name: 'Asr', time: asrAthan },
//         { name: 'Maghrib', time: maghribAthan },
//         { name: 'Isha', time: ishaAthan }
//     ];

//     athanTimes.forEach(({ name, time }) => {
//         if (time) {
//             // const athanDate = new Date(`1970-01-01T${convertTo24Hour(time)}:00Z`);
//             const athanDate = new Date(testAthanTime);
//             const timeDifference = (athanDate - currentTime) / 1000;

//             if (timeDifference <= 60 && timeDifference > 0) {

//                 setCountDownPage(true);
//                 setMainPage(false)
//                 setCountDownAthan(name);

//                 let seconds = 59;
//                 const countdownInterval = setInterval(() => {
//                     setCountDownSeconds(seconds);
//                     seconds -= 1;
//                     if (seconds < 0) {
//                         clearInterval(countdownInterval);
//                         setCountDownPage(false);
//                         setMainPage(true)
//                     }
//                 }, 1000);
//             }
//         }
//     });
// };


//   useEffect(() => {
//     const athanCheckInterval = setInterval(checkForAthan, 1000);
//     return () => clearInterval(athanCheckInterval);
//   }, [fajrAthan, dhurAthan, asrAthan, maghribAthan, ishaAthan, testAthanTime]);

//   useEffect(() => {
//     const currentTime = new Date();
//     const testTime = new Date(currentTime.getTime() + 2 * 60 * 1000); // 2 minutes from now
//     setTestAthanTime(testTime);
// }, []);

  useEffect(() => {
    getDate();
    getHijriDate();
    getAthan();
    momentGetDate();
    setInterval(() => {
      getDate();
      getHijriDate();
      getAthan();
      momentGetDate();
    }, 21600000);
  }, []);

  useEffect(() => {
    getPrayerTimes();
    getAnnouncements();
    getHadiths();
    getNextPrayer();

    setInterval(() => {
      getAnnouncements();
      getPrayerTimes();
      getHadiths();
      getNextPrayer();
    }, 1800000);
  }, []);

  useEffect(() => {
    messageSwapper();
    setMessage(announcements);
    const interval = setInterval(messageSwapper, 120000);
    console.log(message);
    return () => clearInterval(interval);
  }, [announcements, hadith]);

  useEffect(() => {
    const startIntervals = () => {
          setHadithPage(true);
          setMainPage(false);

          const twoMinuteTimeout = setTimeout(() => {
              setHadithPage(false);
              setMainPage(true);

              const sixMinuteTimeout = setTimeout(() => {
                  startIntervals();
              }, 6 * 60 * 1000); // 6 minutes after hadith page is hidden

              return () => clearTimeout(sixMinuteTimeout);
          }, 2 * 60 * 1000); // 2 minutes for showing hadith page

          return () => clearTimeout(twoMinuteTimeout);
      };
    startIntervals();
  }, []);

  return (
    <>
    {mainPage &&(
      <div className="App">
        <div>
          <div className="bigHeader">
            <div className="headerPart1">
              <div className="isogLogo">
                <img src={isogLogo} />
              </div>

              <div className="isogText">Islamic Society of Guelph</div>
            </div>

            <div className="headerPart2">
              <div className="headerFont">مسجد أبو بكر الصديق</div>
              <div className="headerFont2">www.ISOFG.ca</div>
            </div>
          </div>
          <div className="skinnySections">
            <div className="Boxes">
              <div>
                <div className="header2">
                  <div className="header2Text"> {messageHeader} </div>
                </div>
                <div className="message">
                  {Array.isArray(message) ? (
                    message.map((item, index) => <div key={index}>{item}</div>)
                  ) : (
                    <div>{message}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="skinnyBoxes">
              <div className="donateBox">
                <div className="donateText">DONATE TO YOUR MASJID</div>
              </div>

              <div className="silenceBox">
                <div className="silenceText">SILENCE YOUR PHONE</div>
              </div>
            </div>

            <div className="bigPrayerSection">
              <div className="longBlue">
                <div className="startIqamah">
                  <div className="start">START</div>
                  <div className="iqamah">IQAMAH</div>
                </div>

                <div className="prayers">
                  <div
                    className={
                      nextPrayer == "fajr" ? "upcomingPrayer" : "prayerContainer"
                    }
                  >
                    <div
                      className={
                        nextPrayer == "fajr" ? "prayerName1" : "prayerName"
                      }
                    >
                      FAJR
                    </div>

                    <div
                      className={
                        nextPrayer == "fajr" ? "athanTime1" : "athanTime"
                      }
                    >
                      {fajrAthan}
                      <span className="am">AM</span>
                    </div>

                    <div
                      className={
                        nextPrayer == "fajr" ? "prayerTimer1" : "prayerTimer"
                      }
                    >
                      {fajrPrayer}
                      <span className="am">AM</span>
                    </div>
                  </div>

                  <div
                    className={
                      nextPrayer == "dhuhr" ? "upcomingPrayer" : "prayerContainer"
                    }
                  >
                    <div
                      className={
                        nextPrayer == "dhuhr" ? "prayerName1" : "prayerName"
                      }
                    >
                      DHUHR
                    </div>

                    <div
                      className={
                        nextPrayer == "dhuhr" ? "athanTime1" : "athanTime"
                      }
                    >
                      {dhurAthan}
                      <span className="am">PM</span>
                    </div>

                    <div
                      className={
                        nextPrayer == "dhuhr" ? "prayerTimer1" : "prayerTimer"
                      }
                    >
                      {dhurPrayer}
                      <span className="am">PM</span>
                    </div>
                  </div>

                  <div
                    className={
                      nextPrayer == "asr" ? "upcomingPrayer" : "prayerContainer"
                    }
                  >
                    <div
                      className={
                        nextPrayer == "asr" ? "prayerName1" : "prayerName"
                      }
                    >
                      ASR
                    </div>

                    <div
                      className={nextPrayer == "asr" ? "athanTime1" : "athanTime"}
                    >
                      {asrAthan}
                      <span className="am">PM</span>
                    </div>

                    <div
                      className={
                        nextPrayer == "asr" ? "prayerTimer1" : "prayerTimer"
                      }
                    >
                      {asrPrayer}
                      <span className="am">PM</span>
                    </div>
                  </div>

                  <div
                    className={
                      nextPrayer == "maghrib"
                        ? "upcomingPrayer"
                        : "prayerContainer"
                    }
                  >
                    <div
                      className={
                        nextPrayer == "maghrib" ? "prayerName1" : "prayerName"
                      }
                    >
                      MAGHRIB
                    </div>

                    <div
                      className={
                        nextPrayer == "maghrib" ? "athanTime1" : "athanTime"
                      }
                    >
                      {maghribAthan}
                      <span className="am">PM</span>
                    </div>

                    <div
                      className={
                        nextPrayer == "maghrib" ? "prayerTimer1" : "prayerTimer"
                      }
                    >
                      {maghribAthan}
                      <span className="am">PM</span>
                    </div>
                  </div>

                  <div
                    className={
                      nextPrayer == "isha" ? "upcomingPrayer" : "prayerContainer"
                    }
                  >
                    <div
                      className={
                        nextPrayer == "isha" ? "prayerName1" : "prayerName"
                      }
                    >
                      ISHA
                    </div>

                    <div
                      className={
                        nextPrayer == "isha" ? "athanTime1" : "athanTime"
                      }
                    >
                      {ishaAthan}
                      <span className="am">PM</span>
                    </div>

                    <div
                      className={
                        nextPrayer == "isha" ? "prayerTimer1" : "prayerTimer"
                      }
                    >
                      {ishaPrayer}
                      <span className="am">PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="quranContainer">
            <div className="quran">
              Quran Classes For All Ages - Contact Imam (226)-505-7435
            </div>
          </div>
        </div>
        <div className="rightSide">
          <div className="dates">
            <div className="arabicDate">
              {currentHijriYear}-{currentHijriDay}-{currentHijriMonth}
            </div>
            <div className="englishDate">{momentDate}</div>
            <div className="line"></div>
          </div>
          <div className="rightBox">
            <div className="clock">
              <div className="bigTime">{clock}</div>
              <span className="pm">{clockAP}</span>
            </div>
            <div className="nextIqamah">
              {nextPrayer} IQAMAH
              <div className="iqamahTime">
                <div className="ten">
                  {timeUntilNextPrayerHrs}
                  <span className="am2">HR</span>
                </div>
                <div className="thirtyFive">
                  {timeUntilNextPrayerMin}
                  <span className="am2">MIN</span>
                </div>
              </div>
            </div>
            <div className="line2"></div>
          </div>
          <div className="bottomRight">
            <div className="jumuahHeader">JUMU'AH</div>
            <div className="startTime">
              <div className="time">
                1:30
                <span className="am3">PM</span>
                <div className="starts">STARTS</div>
              </div>
              <div className="time">
                1:50
                <span className="am3">PM</span>
                <div className="starts">JUMU'AH</div>
              </div>
            </div>

            <div className="ramadanFooter">
              <div className="time2">
                <div className="vector">
                  <img src={vector} />
                </div>
                {fajrAthan}
                <span className="am4">AM</span>
                <div className="suhoorIftar">SUHOOR</div>
              </div>
              <div className="time2">
                <div className="vector">
                  <img src={cloud} />
                </div>
                {maghribAthan}
                <span className="am4">PM</span>
                <div className="suhoorIftar">IFTAR</div>
              </div>
            </div>
          </div>
          <div className="ishraq">ISHRAQ {shuruq}</div>
        </div>
      </div>
    )}

    {hadithPage &&(
      <Hadith />
    )}

    {countDownPage &&(
      <Countdown 
      countDownSeconds={countDownSeconds} 
      countDownAthan={countDownAthan}
      setMainPage={setMainPage}
      setCountDownPage={setCountDownPage}
      />
    )}
      
    
    </>
  );
}

export default App;
