//  this
//  call, apply, bind
//
function speak (line) {
  console.log(`The ${this.type} rabbit says '${line}'`)
}
let hungryRabbit = {type: "hungry"}
 
speak.call(hungryRabbit, "Burp!")
speak.call({type: 'white'}, "Burp!")

speak.apply(hungryRabbit, [ "Grrr!" ])
speak.apply({type: 'white'}, [ "Grrr!" ])

// bind this
let boundSpeak = speak.bind({type: 'black'})
boundSpeak("I could use a carrot right now.")

// bind argument
let allSpeak = boundSpeak.bind(null, "Carrot!")
allSpeak()
