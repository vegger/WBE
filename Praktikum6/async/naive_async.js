//
//  Naive asynchronous code. This doesn’t work!
//
let fs = require('fs')
let timestamp = new Date().toString()
let contents

fs.writeFile('date.txt', timestamp, () => {})

fs.readFile('date.txt', (err, data) => { 
	if (err) throw err
	contents = data
})

console.log('Comparing the contents')
console.assert(timestamp == contents)