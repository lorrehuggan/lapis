/** @type {import('postcss-load-config').Config} */

const autoprefixer = require('autoprefixer')
const postcssPresetsEnv = require('postcss-preset-env')
const cssnano = require('cssnano')

const config = {
  plugins: [
    autoprefixer(),
    postcssPresetsEnv({
      stage: 0,
    }),
    cssnano({
      preset: 'default',
    })
  ]
}

module.exports = config
