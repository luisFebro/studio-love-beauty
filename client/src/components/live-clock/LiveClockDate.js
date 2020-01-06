import React, { useState, useEffect } from 'react';
import { default as DigitalClock } from 'react-live-clock';
import Clock from 'react-clock';
import './Clock.css';
import getDayMonthBr from '../../utils/dates/getDayMonthBr';
import { CLIENT_URL } from '../../config/clientUrl';

export default function LiveClockDate() {
    const [date, setDate] = useState(new Date());
    const styles = {
        root: {
            position: 'relative',
        },
        digitalClock: {
            color: 'var(--mainPink)',
            fontSize: '4.5em',
            filter: 'drop-shadow(.001em .001em .01em var(--mainDark))'
        },
        date: {
            color: 'var(--mainPink)',
            fontSize: '3.0em',
            filter: 'drop-shadow(.001em .001em .01em var(--mainDark))'
        },
        now: {
            color: 'var(--mainPink)',
            fontSize: '5em',
            filter: 'drop-shadow(.001em .001em .01em var(--mainDark))',
            fontFamily: 'cursive'
        }
    }

    useEffect(() => {
        const secInterval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(secInterval);
    }, [])

    return (
        <div style={styles.root} className="container-center py-4">
            <div className="animated slideInLeft slow delay-4 mr-md-5">
                <Clock
                    className="react-clock shadow-elevation"
                    hourHandLength={60}
                    hourHandOppositeLength={20}
                    hourHandWidth={8}
                    hourMarksLength={20}
                    hourMarksWidth={8}
                    minuteHandLength={90}
                    minuteHandOppositeLength={20}
                    minuteHandWidth={6}
                    minuteMarksWidth={3}
                    secondHandLength={80}
                    secondHandOppositeLength={25}
                    secondHandWidth={7}
                    size={250}
                    value={date}
                />
            </div>
            <div className="container-center display-flex flex-column">
                <div className="animated zoomIn delay-2 slow" style={styles.now}>
                    AGORA
                </div>
                <div className="animated zoomIn delay-2 slow">
                    <DigitalClock style={styles.digitalClock} format={'HH:mm'} ticking={true} />
                </div>
                <div className="animated slideInRight delay-2 slow" style={styles.date}>
                    {getDayMonthBr(date)}
                </div>
            </div>
            <div>
                <img
                    className="shadow-elevation"
                    src={`${CLIENT_URL}/img/icons/cloud.svg`}
                    alt="nuvem"
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}