function parseToProto(json, proto) {
  let obj = Object.create(proto)
  Object.assign(obj, JSON.parse(json))
  return obj
}

module.exports = {parseToProto}

/**
 * TEST:
 * 

describe("Mein Testname", function() {
  const parseToProto = require('../parse-to-proto')

  it("Create a object from json string and add the prototype", function() {
    const proto = { category: "animal" }
    const myObj = {"type":"cat","name":"Mimi","age":3}
    const generatedObj = parseToProto(JSON.stringify(myObj), proto)

    expect(generatedObj).toEqual(myObj)
  })
})

 */
