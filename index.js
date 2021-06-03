const express = require('express');
const app = express();
const cors = require('cors');


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2019-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
    
  ]
  app.use(express.json())
 
  app.use(cors());
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id);
    const note = notes.find(note => {
      console.log(note.id, typeof note.id, id, typeof id, note.id === id)
      return note.id === id
    })
   

    if(note)
    {
      console.log(note);
      response.json(note);
    }
    else{
     response.status(404).end();
    }
  
  })
  app.delete('/api/notes/:id', (req, res)=>{
    const id = Number(req.params.id);
     notes= notes.filter((note)=>note.id !== id);
     
  
     res.status(204).end()
   })
   app.get('/api/notes',(req, res)=>{
     res.send(notes).end();
   })
   app.post('/api/notes', (req, res)=>{
    const note = req.body
    console.log("from notes",note);
    if(!note.content)
    {
      res.status(204).end();
    }
  
    notes = notes.concat(note);
    res.send(note).end();
         
   })
   
const PORT = process.env.PORT||3002;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
