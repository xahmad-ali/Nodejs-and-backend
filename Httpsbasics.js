// import http from node
const http = require('node:http');

// creating a Server, that consoles the string on local host
const server = http.createServer((req, res)=>{
    res.end("Hy there i have created this server")
})

// Every Server needs a port, assign port during development
server.listen(3000)

