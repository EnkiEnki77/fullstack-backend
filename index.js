//Imports node's built in web server module using the old school commonJS module syntax. Nowadays ES modules are 
//generally used for import/export in the frontend, but Node does not currently have full native support. 
const http = require('http')

//Uses the createserver method of the http module to spin up a new web server, a route handler is passed to the server
//to define the response sent back anytime an HTTP request is made to the servers address.
const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('Hello World')
})

const PORT = 3001

app.listen(PORT)

console.log(`App listening on port: ${PORT}`)