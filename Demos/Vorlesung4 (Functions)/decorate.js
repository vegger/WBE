// Verbesserte Version von trace

function trace(func) {
  const f = (...args) => {
    console.log(args)
    return func(...args)
  }
  f.original = func
  return f
}
  
// Fakultätsfunktion
let factorial = (n) => (n<=1) ? 1 : n * factorial(n-1)

console.log("Fakultät von 6 ist ", factorial(6))

// Tracer an Funktion anbringen
console.log("Tracer anhängen")
factorial = trace(factorial)

console.log("Fakultät von 6")
console.log(factorial(6))     // → [ 3 ] → [ 2 ] → [ 1 ] → 6

// zurück zur ursprünglichen Version
console.log("Tracer abhängen")
factorial = factorial.original 

// Aufruf
console.log("Fakultät von 6 ist ", factorial(6))
