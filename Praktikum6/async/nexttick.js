//
//  nexttick vs. immediate and timeout events
//

const fs = require('fs')
const process = require('process')

fs.readFile("nexttick.js", () => {
  
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  
  setImmediate(() => {
    console.log('immediate')
  })
  
  process.nextTick(() => {
    console.log('nexttick')
  })

})