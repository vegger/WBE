//  Die Funktion repeat aus den Folien ist nur sinnvoll für 
//  Funktionen mit Seiteneffekten.
//
//  Hier ist ein anderer Ansatz:
//  Die Funktion iterate baut ein Array auf, indem jedes Element
//  der Funktionswert des vorhergehenden ist
//
function iterate (n, init, fn) {
  let result = [], next = init
  for (let i=0; i<n; i++) {
    result.push(next)
    next = fn(next)
  }
  return result
}

console.log( "iterate(5, 1, n=>n+1):\n", iterate(5, 1, n=>n+1) )
console.log( "iterate(20, 1, n=>n*2):\n", iterate(20, 1, n=>n*2) )
