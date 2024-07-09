import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircle } from '@fortawesome/free-solid-svg-icons';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('human');
  const [scores, setScores] = useState({ human: 0, computer: 0, draw: 0 });
  const [winningLine, setWinningLine] = useState([]);

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const checkWin = (newBoard) => {
    for (let line of lines) {
      const [a, b, c] = line;
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return { winner: newBoard[a], line };
      }
    }
    if (!newBoard.includes('')) {
      return { winner: 'draw', line: [] }; // Draw
    }
    return null;
  };

  const insertSymbol = (index) => {
    if (currentPlayer === 'human' && !board[index]) {
      const newBoard = [...board];
      newBoard[index] = 'x';
      setBoard(newBoard);

      const result = checkWin(newBoard);
      if (result) {
        if (result.winner === 'draw') {
          setScores((prevScores) => ({ ...prevScores, draw: prevScores.draw + 1 }));
        } else {
          setScores((prevScores) => ({ ...prevScores, human: prevScores.human + 1 }));
          setWinningLine(result.line);
        }
        setTimeout(() => {
          resetGame(); 
        }, 2000); // Reset the game after 2 seconds
      } else {
        setCurrentPlayer('computer');
      }
    }
  };

  const playComputer = () => {
    const emptyIndices = board.map((value, index) => (value === '' ? index : null)).filter(val => val !== null);
    if (emptyIndices.length > 0) {
      const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const newBoard = [...board];
      newBoard[randomIndex] = 'o';
      setBoard(newBoard);

      const result = checkWin(newBoard);
      if (result) {
        if (result.winner === 'draw') {
          setScores((prevScores) => ({ ...prevScores, draw: prevScores.draw + 1 }));
        } else {
          setScores((prevScores) => ({ ...prevScores, computer: prevScores.computer + 1 }));
          setWinningLine(result.line);
        }
        setTimeout(() => {
          resetGame(); 
        }, 2000); // Reset the game after 2 seconds
      } else {
        setCurrentPlayer('human');
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setWinningLine([]);
    setCurrentPlayer('human');
  };

  useEffect(() => {
    if (currentPlayer === 'computer') {
      setTimeout(playComputer, 500);
    }
  }, [currentPlayer]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {board.map((value, index) => (
          <div
            key={index}
            className={`w-24 h-24 flex justify-center items-center text-4xl text-white border-4 border-blue-500 cursor-pointer`}
            style={{ backgroundColor: winningLine.includes(index) ? 'gold' : 'black' }}
            onClick={() => insertSymbol(index)}
          >
            {value === 'x' && <FontAwesomeIcon icon={faTimes} />}
            {value === 'o' && <FontAwesomeIcon icon={faCircle} />}
          </div>
        ))}
      </div>
      <div className="text-white text-lg">
        <div className="mb-2">X: YOU WIN: {scores.human}</div>
        <div>O: COMPUTER WINS: {scores.computer}</div>
        <div>DRAW: {scores.draw}</div>
      </div>
    </div>
  );
};

export default Game;















