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