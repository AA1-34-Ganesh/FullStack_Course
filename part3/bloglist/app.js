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
  const blog = new Blog(req.body)
  const savedBlog = await blog.save()

  res.status(201).json(savedBlog)
})

module.exports = app