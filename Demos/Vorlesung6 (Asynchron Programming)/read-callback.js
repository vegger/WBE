const fs = require('fs');

function readFileAsync (file, success, error) {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) error(err)
    else success(data)
  })
}

readFileAsync('/etc/hosts',
  (data) => {
    console.log(data)
  },
  () => {
    console.log("Error reading file")
  })
