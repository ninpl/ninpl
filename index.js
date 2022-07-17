import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import Parser from 'rss-parser'

const parser = new Parser()
const getLatestArticlesFromBlog = () =>
  parser.parseURL('https://moonantonio.github.io/index.xml').then((data) => data.items)

;(async () => {
  const [template, articles] = await Promise.all([
    fs.readFile('./README.md.tpl', { encoding: 'utf-8' }),
    getLatestArticlesFromBlog()
  ])

// create latest articles markdown
const latestArticlesMarkdown = articles
   .slice(0, 5)
   .map(({ title, link }) => `- [${title}](${link})`)
   .join('\n')

// replace all placeholders with info
const newMarkdown = template
  .replace('%{{latest_articles}}%', latestArticlesMarkdown)

await fs.writeFile('README.md', newMarkdown)
})()
