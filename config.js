import { config } from 'dotenv'
import { Indiekit } from '@indiekit/indiekit'
import { JekyllPreset } from '@indiekit/preset-jekyll'
import { GithubStore } from '@indiekit/store-github'
config() // Get .env

if (!process.env.TOKEN) {
  console.log('missing TOKEN .env key')
  process.exit(1)
}
if (!process.env.USER) {
  console.log('missing USER .env key')
  process.exit(1)
}
if (!process.env.REPO) {
  console.log('missing REPO .env key')
  process.exit(1)
}

const github = new GithubStore({
  user: process.env.USER, // Your username on GitHub
  repo: process.env.REPO, // Repository files will be saved to
  branch: 'master', // Branch to publish to
  token: process.env.TOKEN, // GitHub personal access token
})

const jekyll = new JekyllPreset()
// Create a new indiekit instance
const indiekit = new Indiekit()

indiekit.set('publication.me', 'https://rafaj.dev')
indiekit.set('publication.preset', jekyll)
indiekit.set('publication.postTypes', [
  {
    type: 'note',
    name: 'Journal entry',
    post: {
      path: 'b/{​yyyy}-{MM}-{dd}-{​slug}.md',
      url: 'b/{yyyy}-{MM}-{​slug}',
    },
  },
])
indiekit.set('publication.store', github)

// Create a server
const server = indiekit.server()

// Export server
export default server
