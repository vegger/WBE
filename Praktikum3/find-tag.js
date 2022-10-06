function findTag(txt) {
  const regex = /<\w*>/
  let match = txt.match(regex)
  if(!match) return undefined
  const result = match[0].slice(1, match[0].length-1)
  return result
}
//console.log(findTag("hallo <br>"))
module.exports = {findTag}