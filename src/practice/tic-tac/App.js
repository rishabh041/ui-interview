import React, { useState } from 'react';

const createBoard = (n) => {
  return Array(n).fill(null).map(() => Array(n).fill(null));
}

const TicTac = ({ size }) => {
  
  const [board, setBoard] = useState(createBoard(3));
  const [nextChanceX, setNextChanceX] = useState(true);
  const [winner, setWinner] = useState(null);


  const checkWinner = (board) => {
    const n = board.length;

    // check rows
    for(let i=0; i< n; i++){
      if(board[i][0] && board[i].every(cell => cell === board[i][0]))
        return board[i][0];
    };

    // check columns
    for(let i=0; i< n; i++){
      if(board[0][i] && board.every(row => row[i] === board[0][i]))
        return board[0][i]
    }

    // check diagonal1
    if(board[0][0] && board.every((row, index) => row[index] === board[0][0])){
      console.log(board[0][0]);
      return board[0][0];
    }
      

    // check diagonal2
    if(board[0][n-1] && board.every((row,index) => row[n-index-1] === board[0][n-1]))
      return board[0][n-1];

    return null;
  };

  const handleClick = (rIndex, cIndex) => {
    // base case
    if(board[rIndex][cIndex] || winner)
      return;

    const updatedBoard = board.map(row => [...row]);
    updatedBoard[rIndex][cIndex] = nextChanceX ? 'X' : 'O';
    setBoard(updatedBoard);

    // winners logic
    const winnerCheck = checkWinner(updatedBoard);
    if(winnerCheck){
      setWinner(winnerCheck);
    }
    else
      setNextChanceX(prevVal => !prevVal);
  }

  const handleResetGame = () => {
    setBoard(createBoard(3));
    setNextChanceX(true);
    setWinner(null);
  }
  
  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {winner && <h2>{`Winner: ${winner}`}</h2>}
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {board.map((row, rIndex) => (
          <div key={rIndex} style={{ display: 'flex'}}>
            {row.map((cellData, cIndex) => (
              <button 
                key={`${rIndex}_${cIndex}`}
                onClick={() => handleClick(rIndex, cIndex)}
                style={{ width: '60px', height: '60px', cursor: 'pointer'}}
              >
                {cellData}
              </button>
            ))}

          </div>
        ))}
      </div>
      <button onClick={handleResetGame}>Reset Game</button>
    </div>
  );
};

export default TicTac;

// utils
// createBoard 3x3
// handleMoves/handleClick
// winner