'use strict'

export function connect4Winner(color, board) {
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

  //check diagonal descending 
  for(let rowNr = 0; rowNr < board.length; rowNr++) {
    let count = 0;

    for(let colNr = 0; colNr < board[0].length; colNr++) {
      if(board[rowNr][colNr] == color) {
        count++;
        let nextColNr = colNr + 1
        for(let nextRowNr = rowNr + 1; nextRowNr < board.length; nextRowNr++) {
          if(nextColNr >= board[0].length) break
          if(board[nextRowNr][nextColNr] == color) count++
          else count = 0
          if(count >= 4) return true
          nextColNr++
        }
      }
      count = 0
    }
  }

  //check diagonal ascending
  for(let rowNr = board.length - 1; rowNr >= 0; rowNr--) {
    let count = 0;

    for(let colNr = board[0].length - 1; colNr >= 0; colNr--) {
      if(board[rowNr][colNr] == color) {
        count++;
        let nextColNr = colNr + 1
        for(let nextRowNr = rowNr - 1; nextRowNr >= 0; nextRowNr--) {
          if(nextColNr > board[0].length - 1) break
          if(board[nextRowNr][nextColNr] == color) count++
            else count = 0 
          if(count >= 4) return true
          nextColNr++
        }
      }
      count = 0
    }
  }

  return false
}
