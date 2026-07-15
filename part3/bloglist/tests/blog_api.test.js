const { test, beforeEach, after, describe } = require('node:test')
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

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: 'JavaScript',
    author: 'Ganesh',
    url: 'javascript.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})
test('if title is missing,get 400 status code', async () => {
  const newBlog = {
    author: 'Ganesh',
    url: 'express.com',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})
test('if url is missing,status code 400', async () => {
  const newBlog = {
    title: 'Express Guide',
    author: 'Ganesh',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length)
})
describe('deletion of a blog', () => {

  test('succeeds with status code 204', async () => {

    const blogStart = await Blog.find({})

    const blogDelete = blogStart[0]

    await api
      .delete(`/api/blogs/${blogDelete.id}`)
      .expect(204)

    const blogEnd = await Blog.find({})

    assert.strictEqual(
      blogEnd.length,
      initialBlogs.length - 1
    )
  })

})
describe('updating a blog', () => {

  test('likes updated', async () => {
    const blogStart = await Blog.find({})
    const blogUpdate = blogStart[0]

    const updatedBlog = {
      ...blogUpdate.toJSON(),
      likes: 100
    }

    const response = await api
      .put(`/api/blogs/${blogUpdate.id}`)
       .send(updatedBlog)
      .expect(200)

    assert.strictEqual(response.body.likes, 100)
    const blogsAtEnd = await Blog.find({})
    assert.strictEqual(
      blogsAtEnd[0].likes,100)
  })
})
after(async () => {
  await mongoose.connection.close()
})