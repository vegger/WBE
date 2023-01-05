// timeout_vs_immediate.js
const fs = require('fs')

fs.readFile("immediate2.js", () => {
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})