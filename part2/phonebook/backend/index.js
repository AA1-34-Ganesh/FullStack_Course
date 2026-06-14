require('dotenv').config()
const express = require('express')
const morgan=require('morgan')
const cors=require('cors')
const app = express()
const Person=require('./models/phonebook.js')

app.use(express.json())
morgan.token('body',(req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors(
  {
    'origin':'http://localhost:5173',
    'credentials':true
  }
))

app.use(express.static('dist'))


app.post('/api/persons',(req,res,next) => {
  let body=req.body
  if(!body.number || !body.name){
    return res.status(400).json({
      error:'Content is missing'
    })
  }
  const person=new Person({
    name:body.name,
    number:body.number
  })
  person.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson)
    })
    .catch(error => next(error))
})
app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})
app.get('/info',(req,res) => {

  Person.find({}).then(persons => {
    const date=new Date()

    res.send(`
         <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>
        `)
  })
})
app.delete('/api/persons/:id',(req,res,next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      next(error)
    })
})
app.put('/api/persons/:id',(req,res,next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name,
      number },
    { new: true,
      runValidators: true,
      context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})
app.get('/api/persons/:id',(req,res,next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})
const unknownreq=(req,res) => {
  res.status(404).send({
    error:'Unknown endpoint'
  })
}
app.use(unknownreq)

const errorHandler=(error,req,res,next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return res.status(400).json({
      error: 'malformatted id'
    })
  }else if(error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    })
  }
  next(error)
}
app.use(errorHandler)
const PORT =process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})