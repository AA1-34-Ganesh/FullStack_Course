require('dotenv').config()
const express = require('express');
const morgan=require('morgan');
const cors=require('cors');
const path=require('path');
const app = express();
const Person=require('./models/phonebook.js');
const { error } = require('console');
app.use(express.json());
morgan.token('body',(request)=>{
    return JSON.stringify(request.body);
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'  )  );
app.use(cors(
    {
        'origin':'http://localhost:5173',
        'credentials':true
    }
))

app.use(express.static('dist'));


app.post('/api/persons',(request,response)=>{
    let body=request.body;
     if(!body.number || !body.name){
         return response.status(400).json({
            error:"Content is missing"
         })
     }
    const person=new Person({
        name:body.name,
        number:body.number
    })
   person.save().then(savedPerson=>{
    response.status(201).json(savedPerson)
   })
})
app.get('/api/persons', (request, response) => {
     Person.find({}).then((persons)=>{
        response.json(persons);
     })
})
app.get('/info',(request,response)=>{
    const date=new Date();
  
    response.send(`
         <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
        `)
})
app.delete('/api/persons/:id',(request,response)=>{
  Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
        })
})
app.get('/api/persons/:id',(request,response)=>{
    const id=request.params.id;
    const data=persons.find(person=>person.id===id)
    if(data){
       response.json(data)
    }else{
       response.status(404).end()
    }
})
const unknownRequest=(request,response)=>{
    response.status(404).send({
        error:'Unknown endpoint'
    })
}
app.use(unknownRequest);
const PORT =process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})