"use strict"

import { setInList, setInObj } from "./changeState.js";

/*
  *  This solution sould be considered as a proof of concept – the code
  *  definitely needs some cleanup and documentation
  */
window.onload = () => {
  initGame()
}

let state = {
  board: [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ],
  next: "b",
};

let stateSeq = [Object.assign({}, state)] //GCY

const SERVICE = "http://localhost:3000/api/data/c4state?api-key=c4game";

//  Initialize game
//
function initGame() {
  let board = showBoard();
  attachEventHandler(board);
}

//  Show board
//
function showBoard() {
  let board = document.querySelector(".board");

  // first remove all fields
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  // ...
  // your implementation
  // ...
  let nodes = [];
  let indexCol = 0;
  let indexRow = 0;
  for (let row of state.board) {
    for (let field of row) {
      const node = elt(
        "div",
        {
          class: "field",
          "data-col": `${indexCol}`,
          "data-row": `${indexRow}`,
        },
        ""
      );
      if (field == "b") {
        node.append(
          elt("div", {
            class: "blue piece",
            "data-col": `${indexCol}`,
            "data-row": `${indexRow}`,
          })
        );
      } else if (field == "r") {
        node.append(
          elt("div", {
            class: "red piece",
            "data-col": `${indexCol}`,
            "data-row": `${indexRow}`,
          })
        );
      }

      nodes.push(node);
      indexCol++;
    }
    indexCol = 0;
    indexRow++;
  }

  document.getElementsByClassName("board")[0].append(...nodes);
  return document.getElementsByClassName("board")[0];
}

//  Helper function for DOM manipulation
//
function elt(type, attrs, ...children) {
  let node = document.createElement(type);
  for (let a in attrs) {
    node.setAttribute(a, attrs[a]);
  }
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

//  Attach event handler to board
//
function attachEventHandler(board) {
  board.addEventListener("click", (e) => {
    // ...
    // your implementation
    // ...
    const node = e.target;
    const colNr = node.dataset.col;
    const rowNr = node.dataset.row;
    makeMove(rowNr, colNr);
    showBoard();
  });
}

// ...
// your implementation
// ...
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

//  Get current state from server and re-draw board
//
async function loadState() {
  // ...
  // your implementation
  // ...
  let res = await fetch(
    "http://localhost:3000/api/data/1234567890?api-key=c4game"
  ).then((r) => r.json());
  state = res;
  showBoard();
}

//Your implementation
function loadStateFromLocalStorage() {
  tempState = JSON.parse(localStorage.getItem("state"));
  if (tempState) {
    state = tempState;
    showBoard();
  }
}

//  Put current state to server
//
function saveState() {
  // ...
  // your implementation
  // ...
  fetch("http://localhost:3000/api/data/1234567890?api-key=c4game", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(state),
  });
}

//Your implementation
function saveStateToLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}

//Your implementation 

// wege ohni sjdon
window.undoState = function undoState() {
  if(stateSeq.length == 0) return
  state = stateSeq.pop()
  showBoard()
}