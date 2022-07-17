// Importacion de lo necesario
import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import Parser from 'rss-parser'

const parser = new Parser()
const obtenerUltimosArticulos = () =>
  parser.parseURL('https://moonantonio.github.io/index.xml').then((data) => data.items)

// Crear la funcion
;(async () => {
  const [plantilla, articulos] = await Promise.all([
    fs.readFile('./README.md.tpl', { encoding: 'utf-8' }),
    obtenerUltimosArticulos()
  ])

// Crear markdown con los ultimos articulos
const ultimosArticulosMD = articulos
   .slice(0, 5)
   .map(({ title, link }) => `- [${title}](${link})`)
   .join('\n')

// Reemplazar con la informacion obtenida
const nuevoMD = plantilla
  .replace('%{{ultimos}}%', ultimosArticulosMD)

await fs.writeFile('README.md', nuevoMD)
})()