export const Winner = ({winner}) => {

  return (
      ['div', `${winner ? 'The winner is ' + winner : ""}`]
  )
}
