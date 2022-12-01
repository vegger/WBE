'use strict'

function connect4Winner(color, board) {
  //check rows
  for(let i = 0; i < board.length; i++) {
    let count = 0
    let last = ''
    for(let j = 0; j < board[i].length; j++) {
      if((last == color || j == 0) && board[i][j] == color) count++
      else count = 0
      last = board[i][j]
      if(count >= 4) return true
    }
    count = 0
  }
  return false
  //check columns
}

console.log(connect4Winner('b', [[ '_', '_', '_', '_', '_', '_', '_' ],
[ '_', '_', '_', '_', '_', '_', '_' ],
[ '_', '_', '_', '_', 'r', '_', '_' ],
[ '_', '_', '_', 'r', 'r', 'b', 'b' ],
[ '_', '_', 'r', 'b', 'r', 'r', 'b' ],
[ 'b', 'b', 'b', 'r', 'r', 'r', 'b' ]]))
