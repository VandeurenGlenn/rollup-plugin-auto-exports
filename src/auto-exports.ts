import { readFile, writeFile } from 'fs/promises'
import { globby } from 'globby'
import { parse } from 'path'

declare type AutoExportOptions = {
  defaultExports: Object,
  exportsDir: String
}

const autoExports = (options: AutoExportOptions) => ({
  name: 'rollup-plugin-auto-exports',
  writeBundle: async (bundleOptions) => {
    const packageExports = options.defaultExports || {}
    const exportsDir = options.exportsDir || bundleOptions.dir || 'exports'
    const glob = await globby(`${exportsDir}/**/*.d.ts`)
    let sorted = glob.map(path => ({ parsed: parse(path), path}))
    sorted.sort((a, b) => {
      return a.parsed.name.localeCompare(b.parsed.name)
    })
    for (const {path, parsed} of sorted) {
      const name = `./${parsed.name.replace('.d', '.js')}`
      packageExports[name] = {
        import: `./${exportsDir}/${parsed.name.replace('.d', '.js')}`,
        types: `./${path}`
      }
    }

    const packageJSON = JSON.parse((await readFile('./package.json')).toString())

    packageJSON.exports = packageExports
    await writeFile('./package.json', JSON.stringify(packageJSON, null, '\t'))
  }
})

export { autoExports }
export default autoExports