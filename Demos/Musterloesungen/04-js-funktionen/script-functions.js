/**
 *  WBE Lab 4
 *  Solutions
 */

require('./scripts.js')

// Test scripts loading
// console.log(SCRIPTS[0])

// oldAndLiving using a for..of loop

// function oldAndLiving (scripts) {
//   let result = []
//   for (scr of scripts) {
//     if (scr.year < 0 && scr.living) result.push(scr.name)
//   }
//   return result
// }

// oldAndLiving width filter and map
const oldAndLiving = (scripts) =>
  scripts.filter(scr => scr.year < 0 && scr.living)
         .map(scr => scr.name)

// Test oldAndLiving
// console.log(oldAndLiving(SCRIPTS))


// numberOfCodes with for..of loop

// function numberOfCodes ({ranges}) {
//   let sum = 0
//   for (rng of ranges) {
//     sum += rng[1] - rng[0]
//   }
//   return sum
// }

// numberOfCodes with reduce
const numberOfCodes = ({ranges}) =>
  ranges.reduce((curr, [from, to]) => curr+to-from, 0)

// Test numberOfCodes
// console.log(numberOfCodes(SCRIPTS[3]))


// look up script name for a character
//
function scriptOfSample (ch, scripts) {
  let cp = ch.codePointAt(0)
  for (scr of scripts) {
    for ([from, to] of scr.ranges) {
      if (from <= cp && cp < to) return scr.name
    }
  }
  return "unknown"
}

// Test scriptOfSample
// console.log(scriptOfSample("A", SCRIPTS))
// console.log(scriptOfSample("英", SCRIPTS))
// console.log(scriptOfSample("я", SCRIPTS))
// console.log(scriptOfSample("مساء الخير", SCRIPTS))
// console.log(scriptOfSample(".", SCRIPTS))


// create object with scripts used in a given string
//
function scriptsInString (strg, scripts) {
  let result = {}, scrName
  for (ch of strg) {
    scrName = scriptOfSample (ch, scripts)
    if (scrName in result) result[scrName] += 1
    else result[scrName] = 1
  }
  return result
}

// Test scriptsInString
// console.log(scriptsInString("مساء الخير", SCRIPTS))
// console.log(scriptsInString('英国的狗说"woof", 俄罗斯的狗说"тяв"', SCRIPTS))
// console.log(scriptsInString('https://pоstfinance.ch', SCRIPTS))


// UTF-8
// 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
//      000   011111   001100   111001   // F0 9F 8C B9 
// payload: x positions
// 1 + 8 + 16 + 32 + 256 + 512 + 2**12 + 2**13 + 2**14 + 2**15 + 2**16
// = 127801

