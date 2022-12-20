"use strict"
import { Board } from './Board.js'
import { useState } from '../lib/suiweb.js'
import { setInObj, setInList } from '../lib/changeState.js'
import { loadState, loadStateFromLocalStorage, saveState, saveStateToLocalStorage } from '../lib/api.js'
import { connect4Winner } from '../lib/connect4-winner.js'

export const App = () => {
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
  let [stateSeq, setStateSeq] = useState("gameHistory", "", [{...defaultState}])

  const makeMove = (rowNr, colNr) => {
    let board = state.board
    for (let i = board.length - 1; i >= 0; i--) {
      if (i < rowNr) return; // Weiter oben als angeklickt
  
      if (board[i][colNr] == "") {
        setStateSeq(s => [...s, state])
        let newList = setInList(board[i], colNr, state.next)
        board = setInList(board, i, newList)
        let next = ""
        state.next == "b" ? (next = "r") : (next = "b");
        connect4Winner(state.next, board) ? alert("WINNER IS " + state.next) : ""
        setState(() => ({board, next}))
        break;
      }
    }
  }

  const loadFromServer = async () => {
    const loadedState = await loadState()
    loadedState ? setState(s => loadedState) : ""
  }

  const loadFromLocalStorage = () => {
    const loadedState = loadStateFromLocalStorage()
    loadedState ? setState(s => loadedState) : ""
  }

  const undoState = () => {
    if(stateSeq.length == 0) return
    const lastElem = stateSeq[stateSeq.length - 1]
    setState(s => lastElem)
    setStateSeq(seq => seq.filter(s => s !== lastElem))
  }

  return ["section", 
          [Board, {board:state.board, clickhandler: makeMove}],
          ["button", {onclick: loadFromLocalStorage}, "load"],
          ["button", {onclick: () => saveStateToLocalStorage(state)}, "save"],
          ["button", {onclick: loadFromServer}, "load from server"],
          ["button", {onclick: () => saveState(state)}, "save to server"],
          ["button", {onclick: undoState}, "undo"]
        ]
          
}