const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/bloglist')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React',
    author: 'Ganesh',
    url: 'abc.com',
    likes: 5
  },
  {
    title: 'Node',
    author: 'John',
    url: 'xyz.com',
    likes: 10
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initialBlogs) {
    await new Blog(blog).save()
  }
})

test('blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(
    response.body.length,
    initialBlogs.length
  )
})
test('blog posts have id property instead of _id', async () => {
  const response = await api.get('/api/blogs')

  const blog = response.body[0]

  assert(blog.id)
  assert.strictEqual(blog._id, undefined)
})
test('creates a new blog post',async()=>{
   
    const newBlog = {
    title: 'Express Guide',
    author: 'Ganesh',
    url: 'express.com',
    likes: 15
  }
  
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  const response=await api.get('/api/blogs')

  assert.strictEqual(
   response.body.length,
   initialBlogs.length+1
  )

  const titles=response.body.map(blog=>blog.title)

  assert(titles.includes(newBlog.title))
})
after(async () => {
  await mongoose.connection.close()
})