//
// timeout vs immediate
//
const fs = require('fs')

setTimeout(() => {
  console.log('timeout')
}, 0)

setImmediate(() => {
  console.log('immediate')
})

fs.readFile("immediate2.js", () => {
  setTimeout(() => {
    console.log('timeout from readFile callback')
  }, 0)
  setImmediate(() => {
    console.log('immediate from readFile callback')
  })
})

console.log('script started')