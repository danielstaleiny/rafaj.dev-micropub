import { config } from 'dotenv'
import { Indiekit } from '@indiekit/indiekit'
import { EleventyPreset } from './11ty.js'
import { GithubStore } from '@indiekit/store-github'

config() // Get .env

if (!process.env.TOKEN) {
  console.log('missing TOKEN .env key')
  process.exit(1)
}
if (!process.env.USERNAME) {
  console.log('missing USERNAME .env key')
  process.exit(1)
}
if (!process.env.REPO) {
  console.log('missing REPO .env key')
  process.exit(1)
}

const github = new GithubStore({
  user: process.env.USERNAME, // Your username on GitHub
  repo: process.env.REPO, // Repository files will be saved to
  branch: 'master', // Branch to publish to
  token: process.env.TOKEN, // GitHub personal access token
})

const eleventy = new EleventyPreset()
// Create a new indiekit instance
const indiekit = new Indiekit()

indiekit.set('publication.me', 'https://rafaj.dev')
indiekit.set('publication.preset', eleventy)
indiekit.set('publication.store', github)

// Create a server
export function run() {
  return indiekit.server({ port: process.env.NODE_PORT || 4000 })
}

// Export server
