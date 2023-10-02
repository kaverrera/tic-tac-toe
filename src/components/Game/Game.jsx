import React from "react";
import {useEffect, useState} from "react";
import './Game.css'
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import Board from "../Board/Board";
import Modal from "../Modal/Modal";
import Video from "../Video/Video";
import calculateWinner from "../../calculateWinner";

export default function Game() {
    const [history, setHistory] = useState(
        [Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [live, setLives] = useState(3)
    const [start, setStart] = useState(true)
    const [videoPlay, setVideoPlay] = useState(false)
    const [autoPlay, setAutoPlay] = useState(false)

    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    let winner;
    if (calculateWinner(currentSquares)) {
        winner = calculateWinner(currentSquares);
    }
    let status, statusClass, active;
    if (winner) {
        status = "Winner: " + winner;
        statusClass = winner === 'X' ? 'status-win--x' : "status-win--y";
        active = true;
    } else if (currentMove === 9) {
        status = "Game over!";
        statusClass = 'status--over'
        active = true;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
        active = false;
    }
    const [modalActive, setModalActive] = useState(active)

    useEffect(() => {
        if (status === "Game over!" || status.startsWith("Winner")) {
            setTimeout(() => setModalActive(true), 500)
        }
    }, [status])

    function handlePlay(nextSquares) {
        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            nextSquares,
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        if (nextHistory.length === 0) {
        }
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const movesX = history.map((squares, move) => {
        let description, color
        if (move === 0) return undefined;
        if (move > 0) {
            description = 'Go to move №' + move;
        }
        if (move % 2 !== 0) {
            color = "move-to-X"
            return (
                <li className="moves-item" key={move}>
                    <button onClick={() => jumpTo(move)} className={`move ${color}`}>
                        {description}
                    </button>
                </li>
            )
        }
    })
    const movesO = history.map((squares, move) => {
        let description, color
        if (move === 0) return undefined;
        if (move > 0) {
            description = 'Go to move №' + move;
        }
        if (move % 2 === 0) {
            color = "move-to-O"
            return (
                <li className="moves-item" key={move}>
                    <button onClick={() => jumpTo(move)} className={`move ${color}`}>
                        {description}
                    </button>
                </li>
            )
        }
    })

    function restart() {
        if (live > 0) {
            setHistory([Array(9).fill(null)]);
            setCurrentMove(0)
            setModalActive(false)
        }
    }

    function watch() {
        setLives(3);
        setVideoPlay(true)
        setAutoPlay(true)
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0)
        setModalActive(false)
    }

    useEffect(() => {
        setTimeout(() => {
            if (status === "Game over!") {
                setLives((v) => v - 1)
            }
        }, 1000)

    }, [status])


    return (
        <>
            <HomeScreen title='Tic-Tac-Toe' text='Press any key to start' start={start} setStart={setStart} restart={restart}/>
            <p className={start ? "decor--hidden" : "decor decor--big"}><span
                className='decor__text'>XOXOXOXOXOXOXOXOXOXOXOX</span></p>
            <p className={start ? "decor--hidden" : "decor decor--medium"}><span
                className='decor__text'>XOXOXOXOXOXOXOXOXOXOXOX</span></p>
            <p className={start ? "decor--hidden" : "decor decor--small"}><span
                className='decor__text'>XOXOXOXOXOXOXOXOXOXOXOXOXOX</span></p>
            <div className={`status ${statusClass}`}>{status}</div>
            <div className='container'>
                <div className="game">
                    <div className="game-info">
                        <ul className='move-list'>{movesX}</ul>
                    </div>
                    <div className="game-board">
                        <Board xIsNext={xIsNext}
                               squares={currentSquares}
                               onPlay={handlePlay}/>
                    </div>
                    <div className="game-info">
                        <ul className='move-list'>{movesO}</ul>
                    </div>
                </div>
            </div>
            <p className={start ? "decor--hidden" : "decor decor--big"}><span
                className='decor__text'>XOXOXOXOXOXOXOXOXOXOXOX</span></p>
            <p className={start ? "decor--hidden" : "decor decor--medium"}><span
                className='decor__text'>XOXOXOXOXOXOXOXOXOXOXOX</span></p>
            <p className={start ? "decor--hidden" : "decor decor--small"}><span
                className='decor__text'>XOXOXOXOXOXOXOXOXOXOXOXOXOX</span></p>
            <Modal active={modalActive} setActive={setModalActive} restart={restart}>
                <h1 className={live ? 'modal__title' : 'modal__title--over'}>{status}</h1>
                <p className={live ? 'modal__line' : 'modal__line--over'}>. . .
                    ........._________________________.......... . . .</p>
                <p className={live ? 'modal__desc' : 'modal__desc--over'}>{live ? 'Lives:' : "Lives are over!"}</p>
                <p className={live ? 'modal__text--hidden' : 'modal__text'}>Watch the video to get lives:</p>
                <div className={live ? 'modal__lives' : 'modal__lives--hidden'}>
                    <img className={live >= 1 ? 'modal__live' : "modal__live--hidden"} src='heart.png' alt='Lives'/>
                    <img className={live >= 2 ? 'modal__live' : "modal__live--hidden"} src='heart.png' alt='Lives'/>
                    <img className={live >= 3 ? 'modal__live' : "modal__live--hidden"} src='heart.png' alt='Lives'/>
                </div>
                <p className={live ? 'modal__line' : 'modal__line--over'}>. . .
                    ........._________________________.......... . . .</p>
                {live ? <div className='btn__container'>
                        <button className='modal__btn modal__btn--play' onClick={() => restart()}>Play again!</button>
                    </div>
                    :
                    <div className='btn__container'>
                        <button className='modal__btn modal__btn--watch' onClick={() => watch()}>Watch the video!
                        </button>
                        <button className='modal__btn modal__btn--play' disabled={true} onClick={() => restart()}>Play
                            again!
                        </button>
                    </div>}
            </Modal>
            <Video source="little-cats.mp4" videoPlay={videoPlay} setVideoPlay={setVideoPlay} autoPlay={autoPlay}/>


        </>
    );
}