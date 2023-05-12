const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  //When sending html as a response you have to actually wrap the text in a html tag
  //We create a route handler based on the method type of the incoming request. If the HTTP method of the request is 
  //get than this route handler shall execute, but if it were a post request we'd have to use app.post for example. 
  //The request parameter of the route handler contains
app.get('/', (req, res) => {
    //send is one method used to respond to the HTTP request
    //express automatically sets the content-type header based on the argument type passed.
    //the status code defaults to 200. 
    res.send(notes)
})

//When sending json in express you dont need to use JSON.stringify, just do res.json
app.get('/notes', (req, res) => {
    //When using the json method of the response object express automatically sets the content-type to application/json
    res.json(notes)
})

//Gets one note based on the id passed to the url param. Url params can be set in routes with the : 
app.get('/notes/:id', (req, res) => {
    //To access the url param from the request reference the params property, which is an object containing all the url
    //params.
    const id = req.params.id
    const note = notes.find(note => note.id == id)

    res.json(note)
})

app.listen(3001)

console.log(`server listening on port: ${3001}`)