export const Field = ({type, rowNr, colNr, clickhandler}) => {
  let color = ''
  if (type === 'r') {
    color = 'red'
  } else if (type === 'b') {
    color = 'blue'
  }

  return (
      ['div', { className: 'field', onclick: () => clickhandler(rowNr, colNr)}, (
          color ? ['div', { className: 'piece ' + color, "data-col": colNr, "data-row": rowNr }] : null
      )]
  )
}
