import { Board } from './Board.js'

export const App = () => {
  let stateSeq = []
  let state = {
    board: [
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', 'b', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ]
    ],
    next: 'r'
  }

  function makeMove(rowNr, colNr) {
    let board = state.board
    for (let i = board.length - 1; i >= 0; i--) {
      if (i < rowNr) return; // Weiter oben als angeklickt
  
      if (board[i][colNr] == "") {
        stateSeq.push(setInObj(state, "board", state.board))
        let newList = setInList(board[i], colNr, state.next)
        board = setInList(board, i, newList)
        state.board = board
        state.next == "b" ? (state.next = "r") : (state.next = "b");
        break;
      }
    }
  }

  const handler = (rowNr, colNr) => {
    console.log("row", rowNr, "col ", colNr)
  }

  return [Board, {board:state.board, clickhandler: handler}]
}