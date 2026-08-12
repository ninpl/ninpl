// ============================================================
// ACTUALIZACIÓN DEL README DESACTIVADA TEMPORALMENTE
//
// ninpl.com está fuera de servicio.
// No consultar el RSS ni modificar README.md.
//
// Cuando el dominio vuelva a estar disponible, restaurar
// la lógica original.
// ============================================================

import { promises as fs } from 'fs'

const today = new Date()
const hoy = today.toLocaleDateString('es-ES')

// RSS DESACTIVADO TEMPORALMENTE
// ninpl.com está fuera de servicio.
// const parser = new Parser()
// const obtenerUltimosArticulos = () =>
//     parser.parseURL('https://ninpl.com/index.xml').then((data) => data.items)

;(async () => {
    const plantilla = await fs.readFile('./README.md.tpl', {
        encoding: 'utf-8'
    })

    // Como el RSS está desactivado, no hay artículos nuevos.
    const ultimosArticulosMD = ''

    const nuevoMD = plantilla
        .replace('%{{ultimos}}%', ultimosArticulosMD)
        .replace('%{{fecha}}%', hoy)

    await fs.writeFile('README.md', nuevoMD)
})()
