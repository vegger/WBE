import { Field } from './Field.js'

export const Board = ({board, clickhandler}) => {
  let rowNr = 0
  let fieldRows = board.map(row => {
    let colNr = 0
    const fieldRow = row.map(type => {
      const field = [Field, {type, rowNr, colNr, clickhandler}]
      colNr++
      return field
    })
    rowNr++
    return fieldRow
  })
  let fields = [].concat(...fieldRows)
  
  return (
    ["div", {className: "board"}, ...fields]
  )
}
