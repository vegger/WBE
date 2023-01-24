//  CommonJS module system in Node.js
//

//  valueA, valueB, func are scoped to the module
//
const valueA = 10
const valueB = 20

//  without const, let, or var, a global variable would have been
//  created, i.e. an attribute of the global object:
//  
//  valueA = 10
//  global.valueB = 20

const func = function (m, n) {
	console.log("in func:   this == module.exports: ", this === module.exports)
	console.log("in func:   this == global:         ", this === global)
	return m * n
}

console.log("top level: this == module.exports: ", this === module.exports)
console.log("top level: this == global:         ", this === global)


//module.exports = { valueA, valueB, func }

module.exports.func = func 
exports.valueA = valueA
this.valueB = valueB

