//Imports node's built in web server module using the old school commonJS module syntax. Nowadays ES modules are 
//generally used for import/export in the frontend, but Node does not currently have full native support. 
const http = require('http');

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
];

//Uses the createserver method of the http module to spin up a new web server, a route handler is passed to the server
//to define the response sent back anytime an HTTP request is made to the servers address.
const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});

    //In order to send json as a response you must first stringify it. 
    response.end(JSON.stringify(notes));
});

const PORT = 3001;

//Binds the server assigned to the app variable to listen for http requests made to port 3001
app.listen(PORT);

console.log(`App listening on port: ${PORT}`);