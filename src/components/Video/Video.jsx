import React from 'react';
import './Video.css'

function Video({videoPlay, setVideoPlay, source, autoPlay}) {
    return (
        <div className={videoPlay ? "video__container" : "video__container video__container--hidden"}>
            <div className="video__border">
                <video className='video' src={source} onEnded={() => setVideoPlay(false)} autoPlay={autoPlay}>
                </video>
            </div>
        </div>
    )
}
export default Video;