export const Winner = ({winner}) => {

  return (
      ['h1', `${winner ? 'The winner is ' + winner : ''}`]
  )
}
