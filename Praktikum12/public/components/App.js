"use strict"
import { Winner } from './Winner.js'
import { Board } from './Board.js'
import { useState } from '../lib/suiweb.js'
import { setInList } from '../lib/changeState.js'
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
  let [winner, setWinner] = useState("winner", "", "")
  let [state, setState] = useState("game", "", defaultState)
  let [stateSeq, setStateSeq] = useState("gameHistory", "", [{...defaultState}])

  const makeMove = (rowNr, colNr) => {
    if(winner) return

    let board = state.board
    for (let i = board.length - 1; i >= 0; i--) {
      if (i < rowNr) return; // Weiter oben als angeklickt
  
      if (board[i][colNr] == "") {
        setStateSeq(s => [...s, state])
        let newList = setInList(board[i], colNr, state.next)
        board = setInList(board, i, newList)
        let next = ""
        state.next == "b" ? (next = "r") : (next = "b")
        connect4Winner(state.next, board) ? setWinner(w => state.next) : ""
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
    if(stateSeq.length == 1) return
    const lastElem = stateSeq[stateSeq.length - 1]
    setState(s => lastElem)
    setStateSeq(seq => seq.filter(s => s !== lastElem))
  }

  const resetGame = () => {
    setState(s => stateSeq[0])
    setStateSeq(s => [{...s[0]}])
  }

  return ["section", 
          [Winner, {winner}],
          ["h2", `${!winner ? 'The next play is ' + state.next : ''}`],
          [Board, {board:state.board, clickhandler: makeMove}],
          ["button", {onclick: loadFromLocalStorage}, "load"],
          ["button", {onclick: () => saveStateToLocalStorage(state)}, "save"],
          ["button", {onclick: loadFromServer}, "load from server"],
          ["button", {onclick: () => saveState(state)}, "save to server"],
          ["button", {onclick: undoState}, "undo"],
          ["button", {onclick: resetGame}, "reset game"]
        ]
          
}