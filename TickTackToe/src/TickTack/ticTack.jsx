import { useState } from 'react';
import { Cell, checkWinner } from './utils.jsx';
import './Board.css';


export default function Board(){
const [board, setBoard] = useState(createInitialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('');

function createInitialBoard() {
  const board = [];
  for (let i = 0; i < 3; i++) {
    board.push(Array(3).fill(""));
  }
  return board;
}
  const handleClick = (row, col) => {
    if (board[row][col] || gameStatus !=='') {
      return;
    }

    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = isXNext ? 'X' : 'O';
    
    setBoard(newBoard);
    
    const winner = checkWinner(newBoard); // Checking Winner
    if (winner) {
      if (winner === 'draw') {
        setGameStatus('Draw!');
      } else {
        setGameStatus(`${winner} wins!`);
      }
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(createInitialBoard);
    setIsXNext(true);
    setGameStatus('');
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <Cell 
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="game-status">
        {gameStatus || `Next player: ${isXNext ? 'X' : 'O'}`}
      </div>
      {renderBoard()}
      <button className="reset-button" onClick={resetGame}>Reset Game</button>
    </div>
  );
} 