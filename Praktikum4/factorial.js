function factorial(number) {
  returnBigInt = false
  if(typeof number == 'bigint') returnBigInt = true

  let result = 1n
  for(let i = BigInt(number); i>0; i--) {
    result *= i
  }
  //return result <= Number.MAX_SAFE_INTEGER ? Number(result) : result
  return returnBigInt ? result : Number(result)
}
module.exports = {factorial}
//console.log(factorial(1))