const fs = require('fs');

function readFilePromise (file) {
  let promise = new Promise(
    function resolver(resolve, reject) {
      fs.readFile(file, "utf8", (err, data) => {
        if (err) reject(err)
        else resolve(data)
      })
    })
  return promise
}


const readHosts = async () => {
  try {
    console.log(await readFilePromise('/etc/hosts'))
  }
  catch (err) {
    console.log("Error reading file")
  }
}

readHosts()



//(async () => {
//  try {
//    console.log(await readFilePromise('/etc/hosts'))
//  }
//  catch (err) {
//    console.log("Error reading file")
//  }
//})()


