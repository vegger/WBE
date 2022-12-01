'use strict'

function connect4Winner(color, board) {
  //check rows
  /*for(let rowNr = 0; rowNr < board.length; rowNr++) {
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
  }*/

  //check diagonal descending 
  for(let rowNr = 0; rowNr < board[1].length; rowNr++) {
    let count = 0;
    let last = '';

    for(let colNr = 0; colNr < board[0].length; colNr++) {
      if(board[rowNr][colNr] == color) {
        count++;
        for(let nextRowNr = rowNr + 1; nextRowNr < board.length; nextRowNr++) {
          for(let nextColNr = colNr + 1; nextColNr < board[0].length; nextColNr++){
            if(board[nextRowNr][nextColNr] == color) count++
            else count = 0
            last = board[rowNr][colNr]
            if(count >= 4) return true
            break
          }
        }
      }
    }
    count = 0
  }

  for(let colNr = 0; colNr < board[0].length; ++colNr) {
    let count = 0; 
    let last = '';
    for(let rowNr = 0; rowNr < board[1].length; rowNr++) {
      if(board[rowNr][colNr] == color) {
        count++;
        for(let nextColNr = colNr + 1; nextColNr < board[0].length; ++nextColNr) {
          for(let nextRowNr = rowNr + 1; nextRowNr < board[1].length; ++nextRowNr){
            if(board[nextColNr][nextRowNr] == color) count++
            else count = 0
          }
        }
      }
    }
    
  }


  return false
}

console.log(connect4Winner('r', [
[ '_', '_', '_', '_', '_', '_', '_' ],
[ '_', '_', '_', '_', 'r', '_', '_' ],
[ '_', '_', '_', '_', '_', '_', '_' ],
[ '_', '_', '_', 'r', 'r', 'b', 'b' ],
[ '_', 'r', 'r', 'b', 'r', 'r', 'b' ],
[ 'b', 'b', 'b', 'r', 'r', 'r', 'b' ]]))

module.exports = { connect4Winner }
