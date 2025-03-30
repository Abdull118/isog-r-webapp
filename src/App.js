import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import moment from 'moment-timezone';
import isogLogo from "./assests/images/isog.png";
import vector from "./assests/images/Vector.png";
import cloud from "./assests/images/cloud.png";
import Hadith from "./Hadith";
import Countdown from "./Countdown";
import Announcement from "./Announcement";
import Ramadan from "./Ramadan";

// use effect comes last
function App() {
  const [mainPage, setMainPage] = useState(true)
  const [hadithPage, setHadithPage] = useState(false)
  const [announcementsPage, setAnnouncementsPage] = useState(false)
  const [countDownPage, setCountDownPage] = useState(false)
  const [ramadanPage, setRamadanPage] = useState(false)

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

  const [fajrAthan12Hr, setFajrAthan12Hr] = useState();
  const [dhurAthan12Hr, setDhurAthan12Hr] = useState();
  const [asrAthan12Hr, setAsrAthan12Hr] = useState();
  const [maghribAthan12Hr, setMaghribAthan12Hr] = useState();
  const [ishaAthan12Hr, setIshaAthan12Hr] = useState();

  const [fajrPrayer, setFajrPrayer] = useState();
  const [dhurPrayer, setDhurPrayer] = useState();
  const [asrPrayer, setAsrPrayer] = useState();
  const [maghribPrayer, setMaghribPrayer] = useState();
  const [ishaPrayer, setIshaPrayer] = useState();

  const [fajrPrayer24Hr, setFajrPrayer24Hr] = useState();
  const [dhurPrayer24Hr, setDhurPrayer24Hr] = useState();
  const [asrPrayer24Hr, setAsrPrayer24Hr] = useState(); 
  const [ishaPrayer24Hr, setIshaPrayer24Hr] = useState();

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

  const [suhoor, setSuhoor] = useState()

  const getAthan = async () => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=Guelph&country=Canada&method=2`
      );
      const json = await response.json();
      setFajrAthan((json.data.timings.Fajr));
      setSuhoor(subtractMinutesToTime(json.data.timings.Fajr, 10));
      setShuruq(addMinutesToTime(json.data.timings.Sunrise, 15));
      setDhurAthan((json.data.timings.Dhuhr));
      setAsrAthan((json.data.timings.Asr));
      setMaghribAthan((json.data.timings.Maghrib));
      setIshaAthan((json.data.timings.Isha));

      setFajrAthan12Hr(convertTo12Hour(json.data.timings.Fajr));
      setDhurAthan12Hr(convertTo12Hour(json.data.timings.Dhuhr));
      setAsrAthan12Hr(convertTo12Hour(json.data.timings.Asr));
      setMaghribAthan12Hr(convertTo12Hour(json.data.timings.Maghrib));
      setIshaAthan12Hr(convertTo12Hour(json.data.timings.Isha));
     
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
      setIshaPrayer(json.isha);

      setFajrPrayer24Hr(convertTo24Hour(json.fajr + ' AM'));
      setDhurPrayer24Hr(convertTo24Hour(json.dhuhr + ' PM')); 
      setAsrPrayer24Hr(convertTo24Hour(json.asr + ' PM')); 
      setIshaPrayer24Hr(convertTo24Hour(json.isha + ' PM'));


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

  function convertTo24Hour(time) {
    const [timePart, modifier] = time.split(" ");
  
    let [hours, minutes] = timePart.split(":");
  
    if (hours === "12") {
      hours = "00";
    }
  
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    console.log(time, `${hours.toString().padStart(2, '0')}:${minutes}`)
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

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
  const subtractMinutesToTime = (timeString, minutesToSubtract) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes - minutesToSubtract);
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
    if (clock) {
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
    const currentTime = moment.tz("America/New_York");
    const prayerTimes = {
      fajr: moment.tz(`${fajrPrayer} AM`, "h:mm A", "America/New_York"),
      dhuhr: moment.tz(`${dhurPrayer} PM`, "h:mm A", "America/New_York"),
      asr: moment.tz(`${asrPrayer} PM`, "h:mm A", "America/New_York"),
      maghrib: moment.tz(`${maghribAthan} PM`, "h:mm A", "America/New_York"),
      isha: moment.tz(`${ishaPrayer} PM`, "h:mm A", "America/New_York"),
    };

    // Ensure prayer times are set to the current day
    for (let prayer in prayerTimes) {
      prayerTimes[prayer].set({
        year: currentTime.year(),
        month: currentTime.month(),
        date: currentTime.date(),
      });
    }

    // Find the next prayer time that is after the current time
    let nextPrayerTime;
    for (let prayer in prayerTimes) {
      if (prayerTimes[prayer].isAfter(currentTime)) {
        setNextPrayer(prayer)
        nextPrayerTime = prayerTimes[prayer];
        break;
      }
    }

    // If no prayer time is after the current time, set the next prayer to the first prayer of the next day
    if (!nextPrayerTime) {
      nextPrayerTime = prayerTimes.fajr.add(1, 'day');
      setNextPrayer('FAJR')
    }

    const duration = moment.duration(nextPrayerTime.diff(currentTime));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();

    setTimeUntilNextPrayerHrs(hours);
    setTimeUntilNextPrayerMin(minutes);

    // console.log('Current Time (ET):', currentTime.format());
    // console.log('Next Prayer Time (ET):', nextPrayerTime.format());
    // console.log('Time Until Next Prayer (Duration):', `${hours} hours and ${minutes} minutes`);
  };

  const messageSwapper = () => {
    setMessage((prevMessage) => {
        if (prevMessage === announcements) {
            setMessageHeader("Hadith");
            return hadith;
        } else {
            setMessageHeader("Today's Message");
            return announcements;
        }
    });
};
  
  const [testAthanTime, setTestAthanTime] = useState('');
  const [athanOrIqamah, setAthanOrIqamah] = useState('');

  const checkForAthan = () => {
      const currentTime = moment.tz("America/New_York");
  
      const athanTimes = [
          { name: 'FAJR', time: fajrAthan },
          { name: 'DHUHR', time: dhurAthan },
          { name: 'ASR', time: asrAthan },
          { name: 'MAGHRIB', time: maghribAthan },
          { name: 'ISHA', time: ishaAthan }
      ];
  
      athanTimes.forEach(({ name, time }) => {
          if (time) {
              // Create a moment object for the current date and time in ET
              const athanTime = moment.tz(`${moment().format('YYYY-MM-DD')} ${time}`, "YYYY-MM-DD HH:mm", "America/New_York");
  
  
              const timeDifference = athanTime.diff(currentTime, 'seconds');
              // console.log('Test Athan Time (ET):', athanTime.format());
              // console.log('Current Time (ET):', currentTime.format());
              // console.log('Time Difference (seconds):', timeDifference);
  
              if (timeDifference <= 300 && timeDifference > 0) {
                  // console.log('Starting Countdown for:', name);
                  setCountDownPage(true);
                  setMainPage(false);
                  setHadithPage(false);
                  setCountDownAthan(name);
                  setAthanOrIqamah('ATHAN')
                  
              }
          }
      });
  };

  const checkForIqamah = () => {
      const currentTime = moment.tz("America/New_York");
  
      const iqamahTimes = [
          { name: 'FAJR', time: fajrPrayer24Hr },
          { name: 'DHUHR', time: dhurPrayer24Hr },
          { name: 'ASR', time: asrPrayer24Hr },  
          { name: 'ISHA', time: ishaPrayer24Hr }
      ];
  
      iqamahTimes.forEach(({ name, time }) => {
          if (time) {
              // Create a moment object for the current date and time in ET
              const iqamahTime = moment.tz(`${moment().format('YYYY-MM-DD')} ${time}`, "YYYY-MM-DD HH:mm", "America/New_York");
              const timeDifference = iqamahTime.diff(currentTime, 'seconds');
  
              if (timeDifference <= 300 && timeDifference > 0) {
                  console.log('Starting Countdown for:', name);
                  setCountDownPage(true);
                  setMainPage(false);
                  setCountDownAthan(name);
                  setHadithPage(false);
                  setAthanOrIqamah('IQAMAH')
              }
          }
      });
  };
  


  const onCountDownComplete = () => {
      setCountDownPage(false);
      setMainPage(true);
  };

  useEffect(() => {
      const athanCheckInterval = setInterval(checkForAthan, 1000);
      return () => clearInterval(athanCheckInterval);
  }, [fajrAthan, dhurAthan, asrAthan, maghribAthan, ishaAthan]);

  useEffect(() => {
      const iqamahCheckInterval = setInterval(checkForIqamah, 1000);
      return () => clearInterval(iqamahCheckInterval);
  }, [fajrPrayer, dhurPrayer, asrPrayer, ishaAthan]);

// useEffect(() => {
//     const currentTime = new Date();
//     const testTime = new Date(currentTime.getTime() + 20000); // 2 minutes from now
//     setTestAthanTime(testTime.toISOString()); // Convert to ISO string
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

    setInterval(() => {
      getAnnouncements();
      getPrayerTimes();
      getHadiths();
    }, 1800000);
  }, []);

  useEffect(() => {
    const interval = setInterval(messageSwapper, 120000);
    return () => clearInterval(interval);
  }, [announcements, hadith]);

  useEffect(() => {
      // Ensure the initial message and header are set correctly
      setMessage(announcements);
      setMessageHeader("Today's Message");
  }, [announcements]);

  useEffect(() => {
    let hadithTimeout, announcementsTimeout, mainPageTimeout;

    const startIntervals = () => {
        setHadithPage(true);
        setMainPage(false);
        setAnnouncementsPage(false);

        hadithTimeout = setTimeout(() => {
            setHadithPage(false);
            setAnnouncementsPage(true);

            announcementsTimeout = setTimeout(() => {
                setAnnouncementsPage(false);
                setMainPage(true);

                mainPageTimeout = setTimeout(() => {
                    startIntervals();
                }, 3 * 60 * 1000); // 6 minutes for showing main page

            }, 30000); // 30 seconds for showing announcements page

        }, 30000); // 30 seconds for showing hadith page
    };

    if (!countDownPage) {
        startIntervals();
    }

    return () => {
        clearTimeout(hadithTimeout);
        clearTimeout(announcementsTimeout);
        clearTimeout(mainPageTimeout);
    };
}, [countDownPage]);



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
                      {fajrAthan12Hr}
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
                      {dhurAthan12Hr}
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
                      {asrAthan12Hr}
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
                      {maghribAthan12Hr}
                      <span className="am">PM</span>
                    </div>

                    <div
                      className={
                        nextPrayer == "maghrib" ? "prayerTimer1" : "prayerTimer"
                      }
                    >
                      {maghribAthan12Hr}
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
                      {ishaAthan12Hr}
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
                {suhoor}
                <span className="am4">AM</span>
                <div className="suhoorIftar">SUHOOR</div>
              </div>
              <div className="time2">
                <div className="vector">
                  <img src={cloud} />
                </div>
                {maghribAthan12Hr}
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
      countDownAthan={countDownAthan}
      setMainPage={setMainPage}
      onCountDownComplete={onCountDownComplete}
      athanOrIqamah={athanOrIqamah}
      />
    )}

    {announcementsPage &&(
      <Announcement />
    )}

    {ramadanPage &&(
      <Ramadan currentHijriDay={currentHijriDay} suhoor={suhoor} maghribAthan12Hr={maghribAthan12Hr}/>
    )}
      
    
    </>
  );
}

export default App;
