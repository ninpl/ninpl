    const fs = require('fs').promises
    const Parser = require('rss-parser')
    const parser = new Parser()

    const NOMBRE_ULTIMO = '%{{ultimo}}%';

    ;(async () => {
        const markdownTemplate = await fs.readFile('./README.md.tpl', {encoding: 'utf-8'})
        const {item} = await parser.parseUrl('https://moonantonio.github.io/index.xml')
        const [{title, link}] = item
        const ultimoMakdown = '[${title}](${link})'
        const nuevoMarkdown = markdownTemplate.replace(NOMBRE_ULTIMO, ultimoMakdown)
        await fs.writeFile('./README.md', nuevoMarkdown)
    })()