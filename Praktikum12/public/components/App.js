"use strict"
import { Board } from './Board.js'
import { useState } from '../lib/suiweb.js'
import { setInObj, setInList } from '../changeState.js'

export const App = () => {
  let stateSeq = []
  let defaultState = {
    board: [
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ],
      [ '', '', '', '', '', '', '' ]
    ],
    next: 'r'
  }
  let [state, setState] = useState("game", "", defaultState)
  console.log(state.board)

  function makeMove(rowNr, colNr) {
    let board = state.board
    for (let i = board.length - 1; i >= 0; i--) {
      if (i < rowNr) return; // Weiter oben als angeklickt
  
      if (board[i][colNr] == "") {
        stateSeq.push(setInObj(state, "board", state.board))
        let newList = setInList(board[i], colNr, state.next)
        board = setInList(board, i, newList)
        let next = ""
        state.next == "b" ? (next = "r") : (next = "b");
        setState(() => ({board, next}))
        break;
      }
    }
    console.log(board)
    setState(state)
  }

  return ["section", 
          [Board, {board:state.board, clickhandler: makeMove}],
          ["button", {onclick: () => console.log("hallo")}, "load"],
          ["button", "", "safe"],
          ["button", "", "safe from server"],
          ["button", "", "safe to server"],
          ["button", "", "undo"]
        ]
          
}