//  this
//  function invocation
//
//  "use strict"
//
function speak (line) {
  console.log(`The ${this.type} rabbit says '${line}'`)
}
 
speak("I could use a carrot right now.")


//  try to run this script from the shell:
//  $ node this-function-invocation.js
//
//  also try to load it from the REPL:
//  $ node
//  > .load this-function-invocation.js
//
//  also try to uncomment "use strict"
//
console.log("this == module.exports: ", this === module.exports)
console.log("this == global:         ", this === global)