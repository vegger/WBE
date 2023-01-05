//  this
//  method invocation
//
function speak (line) {
  console.log(`The ${this.type} rabbit says '${line}'`)
}

let whiteRabbit = {type: "white", speak}
let hungryRabbit = {type: "hungry", speak}
 
whiteRabbit.speak("I could use a carrot right now.")
hungryRabbit.speak("I could use a carrot right now.")