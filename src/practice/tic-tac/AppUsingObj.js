import React, { useState } from 'react';

// Utility to create an empty board as an object
const createBoard = (n) => {
  const board = {};
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      board[`${row}_${col}`] = null;
    }
  }
  return board;
};

const TicTac = ({ size = 3 }) => {
  
  const [board, setBoard] = useState(createBoard(size));
  const [nextChanceX, setNextChanceX] = useState(true);
  const [winner, setWinner] = useState(null);

  // Function to check the winner
  const checkWinner = (board, size) => {
    // Check rows
    for (let row = 0; row < size; row++) {
      const rowStart = `${row}_0`;
      if (board[rowStart]) {
        let rowWin = true;
        for (let col = 1; col < size; col++) {
          if (board[`${row}_${col}`] !== board[rowStart]) {
            rowWin = false;
            break;
          }
        }
        if (rowWin) return board[rowStart];
      }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      const colStart = `0_${col}`;
      if (board[colStart]) {
        let colWin = true;
        for (let row = 1; row < size; row++) {
          if (board[`${row}_${col}`] !== board[colStart]) {
            colWin = false;
            break;
          }
        }
        if (colWin) return board[colStart];
      }
    }

    // Check main diagonal
    const diagStart = `0_0`;
    if (board[diagStart]) {
      let diagWin = true;
      for (let i = 1; i < size; i++) {
        if (board[`${i}_${i}`] !== board[diagStart]) {
          diagWin = false;
          break;
        }
      }
      if (diagWin) return board[diagStart];
    }

    // Check anti-diagonal
    const antiDiagStart = `0_${size - 1}`;
    if (board[antiDiagStart]) {
      let antiDiagWin = true;
      for (let i = 1; i < size; i++) {
        if (board[`${i}_${size - 1 - i}`] !== board[antiDiagStart]) {
          antiDiagWin = false;
          break;
        }
      }
      if (antiDiagWin) return board[antiDiagStart];
    }

    return null;
  };

  const handleClick = (rIndex, cIndex) => {
    const key = `${rIndex}_${cIndex}`;

    if (board[key] || winner) return;

    const updatedBoard = { ...board, [key]: nextChanceX ? 'X' : 'O' };
    setBoard(updatedBoard);

    const gameWinner = checkWinner(updatedBoard, size);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setNextChanceX(prevVal => !prevVal);
    }
  };

  const resetGame = () => {
    setBoard(createBoard(size));
    setNextChanceX(true);
    setWinner(null);
  };
  
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {winner && <h2>{`Winner: ${winner}`}</h2>}
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {(() => {
          const rows = [];
          for (let rIndex = 0; rIndex < size; rIndex++) {
            const cols = [];
            for (let cIndex = 0; cIndex < size; cIndex++) {
              cols.push(
                <button 
                  key={`${rIndex}_${cIndex}`}
                  onClick={() => handleClick(rIndex, cIndex)}
                  style={{ width: '60px', height: '60px', cursor: 'pointer'}}
                >
                  {board[`${rIndex}_${cIndex}`]}
                </button>
              );
            }
            rows.push(<div key={rIndex} style={{ display: 'flex'}}>{cols}</div>);
          }
          return rows;
        })()}
      </div>
      <button onClick={resetGame} style={{ marginTop: '20px', padding: '10px', cursor: 'pointer'}}>Reset Game</button>
    </div>
  );
};

export default TicTac;
