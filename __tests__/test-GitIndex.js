import { GitIndex } from '../dist/for-node/models'
import { read } from '../dist/for-node/utils'

describe('GitIndex', () => {
  test('GitIndex.from(buffer) - Simple', async () => {
    let buffer = await read('__tests__/__fixtures__/test-GitIndex/simple-index')
    let index = GitIndex.from(buffer)
    let rendering = index.render()
    expect(rendering).toMatchSnapshot()
    let buffer2 = index.toObject()
    expect(buffer.slice(0, buffer2.length - 20)).toEqual(buffer2.slice(0, -20))
  })

  test('GitIndex.from(buffer)', async () => {
    let buffer = await read('__tests__/__fixtures__/test-GitIndex/index')
    let index = GitIndex.from(buffer)
    let rendering = index.render()
    expect(rendering).toMatchSnapshot()
    let buffer2 = index.toObject()
    expect(buffer.slice(0, buffer2.length - 20)).toEqual(buffer2.slice(0, -20))
  })

  test('GitIndex round trip', async () => {
    let buffer = await read('__tests__/__fixtures__/test-GitIndex/index')
    let index = GitIndex.from(buffer)
    let buffer2 = index.toObject()
    let index2 = GitIndex.from(buffer2)
    let buffer3 = index2.toObject()
    expect(buffer2).toEqual(buffer3)
  })
})
