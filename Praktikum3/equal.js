function equal(o1, o2) {
  if(o1 === o2) return true
  if(typeof o1 !== 'object') return false
  if(typeof o1 !== typeof o2) return false

  const o1Keys = Object.keys(o1)

  if(o1Keys.length !== Object.keys(o2).length) return false
  
  for(let key of o1Keys) {
      if(o1[key] !== o2[key]) return false 
  }

  return true
}
//equal()
module.exports = {equal}