//
//  wait returns a promise that is resolved after some time
//

function wait (ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

wait(2000).then(() => console.log("first"))
wait(2000).then(() => console.log("second"))

