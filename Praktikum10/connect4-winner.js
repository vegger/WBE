'use strict'

function connect4Winner(color, board) {
  //check rows
  for(let rowNr = 0; rowNr < board.length; rowNr++) {
    let count = 0
    let last = ''
    for(let colNr = 0; colNr < board[rowNr].length; colNr++) {
      if(board[rowNr][colNr] == color) count++
      else count = 0
      last = board[rowNr][colNr]
      if(count >= 4) return true
    }
    count = 0
  }

  //check columns
  for(let colNr = 0; colNr < board[0].length; colNr++) {
    let count = 0
    let last = ''
    for(let rowNr = 0; rowNr < board.length; rowNr++) {
      if(board[rowNr][colNr] == color) count++
      else count = 0
      last = board[rowNr][colNr]
      if(count >= 4) return true
      //console.log("ROW: ", rowNr, " COL: ", colNr, "COLOR: ", board[rowNr][colNr], "COUNT: ", count)
    }
    count = 0
  }

  //check diagonal
  //TODO


  return false
}

console.log(connect4Winner('r', [[ '_', '_', '_', '_', '_', '_', '_' ],
[ '_', '_', '_', '_', 'r', '_', '_' ],
[ '_', '_', '_', '_', '_', '_', '_' ],
[ '_', '_', '_', 'r', 'r', 'b', 'b' ],
[ '_', 'r', 'r', 'b', 'r', 'r', 'b' ],
[ 'b', 'b', 'b', 'r', 'r', 'r', 'b' ]]))
