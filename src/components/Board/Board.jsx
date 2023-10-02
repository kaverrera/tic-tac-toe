import React from "react";
import Square from "../Square/Square";
import './Board.css'
import calculateWinner from "../../calculateWinner";

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
        <div className='board'>
            {squares.map((_,index) => <Square value={squares[index]} onSquareClick={(() => handleClick(index))} key={Math.random()}/>)}
        </div>
    );
}
export default Board