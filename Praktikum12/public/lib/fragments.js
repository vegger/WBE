
import { render } from "./suiweb.js"

let state = {
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

let stateSeq = []


//  Components
//
const App = () => [Board, {board: state.board}] 

const Board = ({board}) => {
  let flatBoard = [].concat(...board)
  let fields = flatBoard.map((type) => [Field, {type}])
  return (
    ["div", {className: "board"}, ...fields]
  )
}

const Field = ({fields}) => {
  let color = ''
    if (type === 'r') {
        color = 'red'
    } else if (type === 'b') {
        color = 'blue'
    }

    return (
        ['div', { className: 'field' }, (
            color ? ['div', { className: 'piece ' + color }] : null
        )]
    )
}


//  Show board:
//  render [App]
//
function showBoard () {
  const app = document.querySelector(".app")
  render([App], app)
  return app
}


  
// document.querySelector("button.undo").addEventListener("click", () => {
//   if (stateSeq.length > 0) {
//     state = stateSeq.pop()
//     showBoard()
//   }
// })

