//
//  Rejecting a promise by throwing an error in the constructor 
//  callback or in the handler chain
//

var promise = new Promise((resolve, reject) => { 
//	reject()
//	throw Error('fail')
	resolve()
})

promise
	.then(() => console.log('step1'))
//	.then(() => { throw Error('fail') })
	.then(() => console.log('step2'))
	.catch (() => console.log('catch1'))
	.then(() => console.log('step3'))
	.catch (() => console.log('catch2'))
	.then(() => console.log('step4'))

