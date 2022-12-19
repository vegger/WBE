import { Field } from './Field.js'

export const Board = ({board, clickhandler}) => {
  let flatBoard = [].concat(...board)
  console.log(board)
  let rowNr = 0
  board.map(row => {
    let colNr = 0
    row.map(field => console.log("row:", rowNr, " colNr:", colNr++, "content: ", field))
    rowNr++
  })
  let fields = flatBoard.map((type) => [Field, {type}])
  return (
    ["div", {className: "board", onclick: clickhandler}, ...fields]
  )
}
