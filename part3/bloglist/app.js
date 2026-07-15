require('dotenv').config()
const express = require('express')
const Blog = require('./models/bloglist')

const app = express()

app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {

    try{
          const blog = new Blog(req.body)
  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)

  res.status(204).end()
})

app.put('/api/blogs/:id',async(req,res)=>{
    try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    )
    res.json(updatedBlog)
  } catch (error) {
    res.status(400).json({
        error:error.message
    })
  }
})
module.exports = app