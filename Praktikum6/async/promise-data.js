//
//  Passing values in a sequence of steps
//

function step1() {
	return Promise.resolve('ta-da!')
}

step1().then(
	function step2(result) {
		console.log('Step 2 received ' + result)
		return 'Greetings from step 2'
	})
	.then(
	function step3(result) {
		console.log('Step 3 received ' + result)
	})
	.then(
	function step4(result) {
		console.log('Step 4 received ' + result)
		return Promise.resolve('Use my fulfilled value')
	})
	.then(
	function step5(result) {
		console.log('Step 5 received ' + result)
	})