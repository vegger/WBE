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


readFilePromise('/etc/hosts')
  .then(console.log)
  .catch(() => {
    console.log("Error reading file")
  })
