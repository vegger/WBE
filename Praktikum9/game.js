let currentColor = 'b' // can only be 'b' or 'r'
let state

window.onload = () => {
  resetGame()
}

function boardToDOM(fields) { //Fields is 2D Array like state
  let nodes = []
  indexCol = 0
  indexRow = 0
  for(let row of fields) {
    for(let field of row) {
      const node = elt("div", {"class": "field", "data-col": `${indexCol}`, "data-row": `${indexRow}`}, "")
      if(field == 'b') {
        node.append(elt("div", {"class": "blue piece"}))
      } else if (field == 'r') {
        node.append(elt("div", {"class": "red piece"}))
      }
      node.onclick = () => onClickHandler(node)
      nodes.push(node)
      indexCol++
    }
    indexCol = 0
    indexRow++
  }
  document.getElementsByClassName("board")[0].innerHTML = ''
  document.getElementsByClassName("board")[0].append(...nodes)
}

function onClickHandler (node) {
  const colNr = node.dataset.col
  const rowNr = node.dataset.row
  console.log("COL: ", colNr)
  console.log("ROW: ", rowNr)
  makeMove(colNr, rowNr)
}

function makeMove(colNr, rowNr) {
  if(state[rowNr][colNr]) return // Feld ist bereits besetzt

  for(let i = state.length-1; i >= 0; i--) {
    if(i < rowNr) return // Weiter oben als angeklickt

    if(state[i][colNr] == ''){
      state[i][colNr] = currentColor
      switchColor()
      break
    }
  }
  boardToDOM(state)
}

function switchColor() {
  if(currentColor == "b") {
    currentColor = 'r'
  } else if (currentColor == "r") {
    currentColor = 'b'
  }
}

function elt (type, attrs, ...children) {
  let node = document.createElement(type)
  for (a in attrs) {
    node.setAttribute(a, attrs[a])
  }
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child)
    else node.appendChild(document.createTextNode(child))
  }
  return node
}

function resetGame() {
  console.log("RESET")
  state = Array(6).fill("").map(() => Array(7).fill(""))
  boardToDOM(state)
}