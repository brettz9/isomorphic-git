import git from '..'
import { copyFixtureIntoTempDir } from 'jest-fixtures'

describe('config', () => {
  test('getting', async () => {
    // Setup
    let clientDir = await copyFixtureIntoTempDir(__dirname, 'test-config.git')
    // Test
    let repo = git().gitdir(clientDir)
    let sym = await repo.config('core.symlinks')
    let rfv = await repo.config('core.repositoryformatversion')
    let url = await repo.config('remote.origin.url')
    expect(sym).toBe(false)
    expect(url).toBe('https://github.com/wmhilton/isomorphic-git')
    expect(rfv).toBe('0')
  })

  test('setting', async () => {
    // Setup
    let clientDir = await copyFixtureIntoTempDir(__dirname, 'test-config.git')
    // Test
    let repo = git().gitdir(clientDir)
    let bare
    // set to true
    await repo.config('core.bare', true)
    bare = await repo.config('core.bare')
    expect(bare).toBe(true)
    // set to false
    await repo.config('core.bare', false)
    bare = await repo.config('core.bare')
    expect(bare).toBe(false)
    // change a remote
    await repo.config(
      'remote.origin.url',
      'https://github.com/wmhilton/isomorphic-git'
    )
    let url = await repo.config('remote.origin.url')
    expect(url).toBe('https://github.com/wmhilton/isomorphic-git')
  })
})
