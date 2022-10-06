const assert = require('assert')
const power = function(base, exponent) {
  assert(Number.isInteger(exponent) && Number.isInteger(base) && exponent >= 0)
  if(exponent == 0) return 1
  else if(exponent%2==0) return power(base, exponent/2)**2
  return base*power(base, --exponent)
}

//console.log(power(2, 7))

module.exports = {power}