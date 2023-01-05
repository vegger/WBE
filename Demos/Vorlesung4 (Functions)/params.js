// Wenn nötig kann mit einem Rest-Parameter auch eine bestimmte 
// Anzahl Argumente erzwungen werden:

function createPoint (...args) {
  if (args.length !== 2) {
    throw new Error('Please provide exactly 2 arguments!')
  }
  const [x, y] = args
  return {x, y}
}

try {
  console.log(createPoint(5))
} catch (error) {
  // console.error(error);
}

try {
  console.log(createPoint(5, 7))
} catch (error) {
  // console.error(error);
}

