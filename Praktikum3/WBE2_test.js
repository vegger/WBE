describe("Compare Objects", function() {
  let {equal} = require('./equal')

  beforeEach(function() {
  })

  it("should return true for same numbers", function() {
    expect(equal(16, 16)).toBeTrue()
  })

  it("should return false for different numbers", function() { //TODO
    expect(equal(16, 17)).toBeFalse()
  })

  it("should return true for same strings", function() {
    expect(equal("hi", "hi")).toBeTrue()
  })

  it("should return false for different strings", function() {
    expect(equal("hi", "hoi")).toBeFalse()
  })
  
  it("should return true for empty objects", function() {
    expect(equal({}, {})).toBeTrue()
  })
  
  it("should return true for same objects", function() {
    expect(equal({a:1, b:2}, {b:2, a:1})).toBeTrue()
  })
  
  it("should return false for different objects", function() { //TODO
    expect(equal({a:1, b:2}, {c:3, b:2, a:1})).toBeFalse()
  })
  
  it("should return false if values are different references", function() {
    expect(equal({a:{}}, {a:{}})).toBeFalse()
  })
  
  it("should return true if values are same references", function() {
  	let emptyObj = {}
    expect(equal({a:emptyObj}, {a:emptyObj})).toBeTrue()
  })

})
