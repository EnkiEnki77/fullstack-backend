const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(express.json())
app.use(cors())

app.use(express.static('build'));

  //When sending html as a response you have to actually wrap the text in a html tag
  //We create a route handler based on the method type of the incoming request. If the HTTP method of the request is 
  //get than this route handler shall execute, but if it were a post request we'd have to use app.post for example. 
  //The request parameter of the route handler contains
app.get('/', (req, res) => {
    //send is one method used to respond to the HTTP request
    //express automatically sets the content-type header based on the argument type passed.
    //the status code defaults to 200. 
    Note.find({})
    .then(notes => {
      console.log(notes)
      res.json(notes)
    })
})

//When sending json in express you dont need to use JSON.stringify, just do res.json
app.get('/notes', (req, res) => {
    //When using the json method of the response object express automatically sets the content-type to application/json
    Note.find({})
    .then(notes => {
      console.log(notes)
      res.json(notes)
    })
})

//Gets one note based on the id passed to the url param. Url params can be set in routes with the : 
app.get('/notes/:id', (req, res) => {
    //To access the url param from the request reference the params property, which is an object containing all the url
    //params.
    const id = req.params.id
    Note.find({id: id})
    .then(note => {
      if(note != null){
        res.json(note)
      }else{
          //You should use the end method to send the response without any data.
          res.status(404).end()
      }
    })

    //When utilizing path params you should always create control flow to determine the response. Otherwise you always 
    //get back the default 200 status code, even if no data was sent back. 
})

app.delete('/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id != id)

    res.status(204).end()
})

//TO add a new note to the 'server' we need to use a post request and send all the data through the request body in JSON
//format.
//We need to use the express module called json-parser

//If your route handler logic gets long, extract logic into functions
function generateId(){
    const maxId = notes.length > 0 
    ? Math.max(...notes.map(note => note.id)) :
    0

    return maxId + 1
}

app.post('/notes', (req, res) => {
    //we have access to the data on the body property of the request object. Without executing the json-parser midlleware
    //the body property would be undefined though.
    //The json-parser takes the JSON data of a request transforms it into a normal js object, and attaches to the body
    //property of the request object before the route handler is called. 

    const body = req.body

    //To ensure the req body data sent by the client has a strict data shape we can use control flow, and define the 
    //data added to the db as a predetermined object with dynamic property values. Instead of just passing the whole 
    //req.body into the db.
    //We can also make a property optional in the body by just giving it a default value with || instead of using control
    //flow
    if(!body.content){
      //If youd like to end the handler because of missing data and send back an error you need to use return otherwise
      //the malformed note will still be added to the db.
      return res.status(400).json({
        error: 'content is missing'
      })
    }

    const note = new Note({
      date: new Date().toString(),
      content: body.content,
      important: body.important || false,
    })

    note
    .save()
    .then(result => {
      console.log(`added new note`)
      // mongoose.connection.close()
    })
    
    console.log(notes)
    res.json(note)
})

app.put('/notes/:id', (req, res) => {
  res.send(req.body)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`))

