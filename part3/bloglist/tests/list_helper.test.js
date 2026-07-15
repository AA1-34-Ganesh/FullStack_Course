const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('empty list returns 0', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('single blog', () => {
    assert.strictEqual(
      listHelper.totalLikes([
        { likes: 5 }
      ]),
      5
    )
  })

})

describe('favorite blog', () => {

  test('empty list returns null', () => {
    const result = listHelper.favoriteBlog([])

    assert.strictEqual(result, null)
  })

  test('single blog is favorite', () => {
    const blogs = [
      {
        title: 'Node.js',
        author: 'Ganesh',
        likes: 5
      }
    ]

    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[0])
  })

  test('returns blog with most likes', () => {
    const blogs = [
      {
        title: 'React',
        author: 'A',
        likes: 7
      },
      {
        title: 'MongoDB',
        author: 'B',
        likes: 20
      },
      {
        title: 'Express',
        author: 'C',
        likes: 12
      }
    ]

    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, blogs[1])
  })

})


