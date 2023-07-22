# rollup-plugin-auto-exports
 
> only for ts at the moment
## install
```sh
npm i rollup-plugin-auto-exports
```

## usage
```js
...
plugins: [
  autoExports({
    //optional
    defaultExports: {
      '.': {
        import: './exports/custom-elements.js',
        types: './exports/custom-elements.d.ts'
      }
    },
    // default
    exportsDir: 'exports'
  })
]
...
```