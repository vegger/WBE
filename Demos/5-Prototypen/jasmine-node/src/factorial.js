/**
 *  WBE-Praktikum
 *  Aufgabe: Fakultätsfunktion iterativ, sowohl Number als 
 *  auch BigInt verarbeitet
 */

//  Fakultätsfunktion
//
function factorial (n) {
  let fact = 1, start = 2
  if (typeof(n) === 'bigint') {
    fact = 1n, start = 2n
  }
  for (let i=start; i<=n; i++) {
    fact *= i
  }
  return fact
}

module.exports = { factorial }