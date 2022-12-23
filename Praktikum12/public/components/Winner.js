export const Winner = ({winner}) => {

  return (
      ['h2', `${winner ? 'The winner is ' + winner : ''}`]
  )
}
