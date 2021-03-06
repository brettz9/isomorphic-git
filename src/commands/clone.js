import { init } from './init'
import { config } from './config'
import { fetch } from './fetch'
import { checkout } from './checkout'

export async function clone ({
  workdir,
  gitdir,
  url,
  remote,
  ref,
  authUsername,
  authPassword,
  depth,
  since,
  exclude,
  relative,
  onprogress
}) {
  remote = remote || 'origin'
  await init({ gitdir })
  // Add remote
  await config({
    gitdir,
    path: `remote.${remote}.url`,
    value: url
  })
  // Fetch commits
  await fetch({
    gitdir,
    ref,
    remote,
    authUsername,
    authPassword,
    depth,
    since,
    exclude,
    relative,
    onprogress
  })
  // Checkout branch
  await checkout({
    workdir,
    gitdir,
    ref,
    remote
  })
}
