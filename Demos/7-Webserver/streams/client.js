const {request} = require("http")

let rq = request({
  hostname: "localhost",
  port: 8000,
  method: "POST"
}, response => {
  response.on("data", chunk =>
    process.stdout.write(chunk.toString()));
})

rq.write("Hello server\n")
rq.write("And good bye\n")
rq.end()