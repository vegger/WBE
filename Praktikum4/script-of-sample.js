//const charset = require("./scripts")

function scriptOfSample(character, scripts) {
  //if(character.length > 1) return 'unknown'
  charcode = character.codePointAt(0)

  for(lng of scripts) {
    for(range of lng.ranges) {
      if(charcode >= range[0] && charcode <= range[1]) {
        return lng.name
      }
    }
  }

  return 'unknown'
}
module.exports = { scriptOfSample }
//console.log(scriptOfSample('ـب', charset))