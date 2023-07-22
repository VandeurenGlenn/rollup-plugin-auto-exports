import typescript from "@rollup/plugin-typescript";

export default [{
  input: ['src/auto-exports.ts'],
  output: [{
    dir: 'exports',
    format: 'es'
  }],
  plugins: [
    typescript()
  ]
}]