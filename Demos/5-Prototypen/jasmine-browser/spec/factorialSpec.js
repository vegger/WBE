describe("Factorial function", function() {
  // let { factorial } = require('../src/factorial')

  beforeEach(function() {
  })

  it("should return 1 for n=0", function() {
    expect(factorial(0)).toEqual(1)
  })

  it("should return the factorial for n=1..10", function() {
    let results = [0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]
    for (let n=1; n<=10; n+=1) {
      expect(factorial(n)).toEqual(results[n])
    }
  })
  
  it("should return 1n for n=0n..1n", function() {
    expect(factorial(0n)).toEqual(1n)
    expect(factorial(1n)).toEqual(1n)
  })
 
  it("should return the factorial for n=50n", function() {
    let result = 30414093201713378043612608166064768844377641568960512000000000000n
    expect(factorial(50n)).toEqual(result)
  })

})
