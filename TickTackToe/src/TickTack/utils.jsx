
function Cell({value, onClick}){
    return (
        <button className="cell" onClick={onClick}>{value}</button>
    )
}

function checkWinner(board){
    const lines = [
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
  ];
     for (const line of lines) {
    const [[a1, a2], [b1, b2], [c1, c2]] = line;
    
    if (board[a1][a2] && 
        board[a1][a2] === board[b1][b2] && 
        board[a1][a2] === board[c1][c2]) {
      return board[a1][a2]; // Return the winner (X or O)
    }
  }

  let isDraw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        isDraw = false;
        break;
      }
    }
  }
  return isDraw ? 'draw' : null;
}

export { Cell, checkWinner };