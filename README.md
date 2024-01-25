# rollup-plugin-auto-exports

> only for ts at the moment

## install

```sh
npm i rollup-plugin-auto-exports
```

## usage

```js
import autoExports from 'rollup-plugin-auto-exports'
...
input,
output: {
  format: 'es',
  dir: 'exports
},
plugins: [
  autoExports({
    //optional
    defaultExports: {
      '.': {
        import: './exports/custom-elements.js',
        types: './exports/custom-elements.d.ts'
      }
    },
    // output.dir override, default to exports
    exportsDir: 'exports'
  })
]
...
```

## api

### autoExports<options>

#### glob

`default` `'exports/**/*d.ts'`

## explainer

uses .d.ts files located in the desired build dir if no glob is given
