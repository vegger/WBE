// Beim Destrukturieren von Objekten und Arrays sind auch Default-Werte 
// möglich. Durch Kombination der Techniken kann auch eine Art benannte 
// Parameter umgesetzt werden:

function selectEntries({start=0, end=-1, step=1} = {}) {
  return {start, end, step}
}

console.log( selectEntries() )
console.log( selectEntries({end: 10, start: 3}) )
