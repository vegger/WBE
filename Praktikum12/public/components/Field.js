export const Field = ({type}) => {
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
