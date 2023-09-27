import './App.css';
import {useState} from 'react';

function Square({value, onSquareClick}) {
    return <td>
        <button className='square' onClick={onSquareClick}>{value}</button>
    </td>;
}

function Board({xIsNext, squares, onPlay}) {

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return;
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = <p className='square-x'>X</p>;
        } else {
            nextSquares[i] = <p className='square-y'>O</p>;
        }
        onPlay(nextSquares);
    }

    return (
        <>
            <table className='board'>
                <tbody>
                <tr className="board-row">
                    <Square value={squares[0]} onSquareClick={(() => handleClick(0))}/>
                    <Square value={squares[1]} onSquareClick={(() => handleClick(1))}/>
                    <Square value={squares[2]} onSquareClick={(() => handleClick(2))}/>
                </tr>
                <tr className="board-row">
                    <Square value={squares[3]} onSquareClick={(() => handleClick(3))}/>
                    <Square value={squares[4]} onSquareClick={(() => handleClick(4))}/>
                    <Square value={squares[5]} onSquareClick={(() => handleClick(5))}/>
                </tr>
                <tr className="board-row">
                    <Square value={squares[6]} onSquareClick={(() => handleClick(6))}/>
                    <Square value={squares[7]} onSquareClick={(() => handleClick(7))}/>
                    <Square value={squares[8]} onSquareClick={(() => handleClick(8))}/>
                </tr>
                </tbody>
            </table>
        </>
    );
}

function Modal({active}) {
    return <div className={active ? 'modal active': 'modal'}>
        <div className="modal__content">
            <h1>Game over</h1>
            <p>Lives</p>
            <div>!!!!!!!!!</div>
        </div>
    </div>
}

export default function Game() {
    const [history, setHistory] = useState(
        [Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    let winner;
    if (calculateWinner(currentSquares)) {
        winner = calculateWinner(currentSquares);
    }
    let status, statusClass, modalActive;
    if (winner) {
        status = "Winner: " + winner;
        statusClass = winner === 'X' ? 'status-win--x' : "status-win--y";
         modalActive = true;
    } else if (currentMove === 9) {
        status = "Game over!";
        statusClass = 'status--over'
         modalActive = true;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
         modalActive = false;
    }


    function handlePlay(nextSquares) {
        const nextHistory = [
            ...history.slice(0, currentMove + 1),
            nextSquares,
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        } else {
            description = 'Go to game start';
        }
        let color;
        if (move === 0) {
            color = "move-to-start"
        } else if (move % 2 === 0) {
            color = "move-to-O"
        } else {
            color = "move-to-X"
        }


        return (
            <li className="moves-item" key={move}>
                <button onClick={() => jumpTo(move)} className={`move ${color}`}>
                    {description}
                </button>
            </li>
        );
    });
    return (
        <>
            <div className={`status ${statusClass}`}>{status}</div>
            <div className='container'>
                <div className="game">
                    <div className="game-board">
                        <Board xIsNext={xIsNext}
                               squares={currentSquares}
                               onPlay={handlePlay}/>
                    </div>
                    <div className="game-info">
                        <ul className='move-list'>{moves}</ul>
                    </div>
                </div>
            </div>
            <Modal active={modalActive}/>
            
        </>
    );
}


// Функция проверки игры
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a]?.props?.children &&
            squares[a]?.props?.children === squares[b]?.props?.children &&
            squares[a]?.props?.children === squares[c]?.props?.children) {
            return squares[a].props.children;
        }
    }
    return null;
}