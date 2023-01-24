//
//  CONNECT4 WINNER
//  Find out if connect4 game has a winner
//  
//  To do:
//  Integrate into game script
//


//
//  GENERAL LIST AND FUNCTION PROCESSING
//  should be part of some library
//

//  array with n times element el 
const ntimes = (n, el) => Array(n).fill(el)

//  simple range function
const range = (n) => [...Array(n).keys()]

//  is some element true if function is applied to it
const some = (arr, fn) => arr.some((el) => fn(el))

//  partial function application
const partial = (fun, ...args) => (...moreargs) => fun(...args, ...moreargs)

//  is there a sub sequence of n times element el?
const hasSubSeq = (n, el, seq) => (
	range(seq.length - n + 1)
		.some(i => seq.slice(i, i + n)
		.every(value => value === el)))

//  matrix transposition
const columns = (matrix) =>
	matrix[0].map((col, i) => 
		matrix.map(row => row[i]))

//  shift matrix
//  
//  1  2  3                                             1  2  3  _  _
//  4  5  6     => shift2d(matrix, '_', false) =>       _  4  5  6  _
//  7  8  9                                             _  _  7  8  9
//
const shift2d = (matrix, fill, toLeft) =>
	matrix.map((row, i) => {
		let dir = toLeft ? [matrix.length-i-1, i] : [i, matrix.length-i-1]
		return ntimes(dir[0], fill).concat(row, ntimes(dir[1], fill))
	})



//
//  CHECK WHETHER PLAYER EL WON
//  
//  application specific part
//

const connect4Winner = (el, board) =>
	some(board, partial(hasSubSeq, 4, el))
	|| some(columns(board), partial(hasSubSeq, 4, el))
	|| some(columns(shift2d(board, null, false)), partial(hasSubSeq, 4, el))
	|| some(columns(shift2d(board, null, true)), partial(hasSubSeq, 4, el))



module.exports = { connect4Winner }


//
//  TEST
//
/*

let testBoard = [
      [ '_', '_', '_', '_', '_', '_', '_' ],
      [ '_', '_', '_', '_', '_', '_', '_' ],
      [ '_', '_', '_', '_', 'b', '_', '_' ],
      [ '_', '_', '_', 'r', 'r', 'r', 'r' ],
      [ '_', '_', 'b', '_', '_', '_', '_' ],
      [ '_', 'b', 'b', 'r', 'b', '_', '_' ]
]


const printBoard = (matrix) => {
	matrix.forEach(row => {
		console.log(...row)
	})
}

printBoard(testBoard)
console.log(connect4Winner('r', testBoard))

*/