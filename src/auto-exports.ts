import { readFile, writeFile } from 'fs/promises'
import { globby } from 'globby'
import { parse } from 'path'

declare type AutoExportOptions = {
  defaultExports?: Object
  exportsDir?: String
  glob?: string | string[]
  sort?: boolean
}

const defaultOptions = {
  sort: true
}

const autoExports = (options: AutoExportOptions = {}) => ({
  name: 'rollup-plugin-auto-exports',
  writeBundle: async (bundleOptions) => {
    options = { ...defaultOptions, ...options }
    const packageExports = options.defaultExports || {}
    const exportsDir = options.exportsDir || bundleOptions.dir || 'exports'
    const glob = await globby(options.glob ? `${exportsDir}/${options.glob}` : `${exportsDir}/**/*.d.ts`)

    let sorted = glob.map((path) => ({ parsed: parse(path), path }))
    if (options.sort) {
      sorted.sort((a, b) => {
        return a.parsed.name.localeCompare(b.parsed.name)
      })
    }

    for (const { path, parsed } of sorted) {
      const isDeclaration = parsed.name.endsWith('.d') && parsed.ext === '.ts'

      const name = isDeclaration ? `${parsed.name.replace('.d', '')}` : `${parsed.name}`
      packageExports[name] = {
        import: `./${exportsDir}/${isDeclaration ? `${name}${parsed.ext}` : `${name}${parsed.ext}`}`
      }
      if (isDeclaration) {
        packageExports[name].types = `./${path}`
      }
    }

    const packageJSON = JSON.parse((await readFile('./package.json')).toString())

    packageJSON.exports = packageExports
    await writeFile('./package.json', JSON.stringify(packageJSON, null, '\t'))
  }
})

export { autoExports }
export default autoExports
