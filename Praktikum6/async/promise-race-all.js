
//
//  The Promise.all() function accepts an array of promise 
//  instances and returns a new promise which is fulfilled 
//  once all the promises in the array are fulfilled or 
//  rejected as soon as any of the promises in the array 
//  are rejected.
//
//  The Promise.race() function accepts an array of promise 
//  instances and is fulfilled or rejected as soon as one of 
//  the promises in the array is fulfilled or rejected.
//

var p1 = new Promise((resolve, reject) => { 
	setTimeout(resolve, 2000, 'first')
})

var p2 = new Promise((resolve, reject) => { 
	setTimeout(resolve, 3000, 'second')
})

Promise.all([p1, p2]).then(console.log)
Promise.race([p1, p2]).then(console.log)