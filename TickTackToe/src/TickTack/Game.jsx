import React, { useState } from 'react';
import { Cell, checkWinner } from './utils';
import './Game.css';

function Game() {
  const [board, setBoard] = useState(Array(3).fill().map(() => Array(3).fill("")));
  const [isXNext, setIsXNext] = useState(true);
  const [gameStatus, setGameStatus] = useState('');

  const handleClick = (row, col) => {
    // If cell is already filled or game is won, return
    if (board[row][col] || gameStatus === 'X wins!' || gameStatus === 'O wins!' || gameStatus === 'Draw!') {
      return;
    }

    // Create a deep copy of the board
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = isXNext ? 'X' : 'O';
    
    // Update the board
    setBoard(newBoard);
    
    // Check for winner
    const winner = checkWinner(newBoard);
    if (winner) {
      if (winner === 'draw') {
        setGameStatus('Draw!');
      } else {
        setGameStatus(`${winner} wins!`);
      }
    } else {
      // Switch player
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(3).fill().map(() => Array(3).fill("")));
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

export default Game;