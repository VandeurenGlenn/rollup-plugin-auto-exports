import typescript from '@rollup/plugin-typescript'
import autoExports from './exports/auto-exports.js'
export default [
  {
    input: ['src/auto-exports.ts'],
    output: [
      {
        dir: 'exports',
        format: 'es'
      }
    ],
    external: ['fs/promises', 'globby', 'path'],
    plugins: [typescript({ exclude: 'node_modules' }), autoExports()]
  }
]
