import React from 'react';
import {useEffect} from "react";
import "./HomeScreen.css"

function HomeScreen({title, text, start, setStart, restart}) {
    useEffect(() => {
        document.addEventListener('keypress', () => {
            setStart(false)
            restart()
        });
    })
    return <div className={start ? "home" : "home home--unactive"} onClick={() => setStart(false)}>
        <div className="home__content">
            <h1 className='home__title'>{title}</h1>
            <p className="home__text">{text}</p>
        </div>
    </div>
}
export default HomeScreen;