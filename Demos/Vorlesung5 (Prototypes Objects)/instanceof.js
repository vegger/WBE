//  instanceof is already defined as an operator
//  a function instanceof could be implemented like this: 
//
function instanceOf (obj, constr) {
  let curr = Object.getPrototypeOf(obj)
  if (["number", "string", "boolean"].includes(typeof obj)) return false 
  while (curr) {
    if (curr === constr.prototype) return true
    else curr = Object.getPrototypeOf(curr)
  }
  return false 
}
  
console.log("instanceOf([], Array):          ", instanceOf([], Array))
console.log("instanceOf([], Object):         ", instanceOf([], Object))
console.log("instanceOf(Math.max, Function): ", instanceOf(Math.max, Function))
console.log("instanceOf(12, Number):         ", instanceOf(12, Number))
