/**
 *  WBE-Praktikum
 *  Aufgabe: Funktion zum Potenzieren
 */

const assert = (mustBeTrue) => {
  if (! mustBeTrue) {
    throw new Error("AssertionError")
  }
}


/*
 *  Variante 1: iterativ
 *
const power = function (base, exponent) {
	assert(typeof(base) === 'number')
	assert(Number.isInteger(exponent) && exponent >= 0)
  let result = 1
  for (let count = 0; count < exponent; count++) {
    result *= base
  }
  return result
}
 *
 */


/*
 *  Variante 2: rekursiv
 *
const power = function (base, exponent) {
	assert(typeof(base) === 'number')
	assert(Number.isInteger(exponent) && exponent >= 0)
	
	function powerRek (b, n) {
		if (n === 0) return 1
		else return b * powerRek(b, n-1)
	}

	return powerRek(base, exponent)
}
 *
 */


/*
 *  Variante 3: optimiert
 */
const power = function (base, exponent) {
	assert(typeof(base) === 'number')
	assert(Number.isInteger(exponent) && exponent >= 0)
	
	function powerFast (b, n) {
		if (n === 0) return 1
		else if (n%2 === 0) {
			let temp = powerFast(b, n/2)
			return temp * temp
		}
		else {
			return b * powerFast(b, n-1)
		}
	}

	return powerFast(base, exponent)
}


module.exports = { power }
