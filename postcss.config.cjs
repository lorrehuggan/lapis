/** @type {import('postcss-load-config').Config} */

const autoprefixer = require('autoprefixer')
const postcssPresetsEnv = require('postcss-preset-env')
const cssnano = require('cssnano')
const nested = require('postcss-nested')

const config = {
  plugins: [
    nested(),
    autoprefixer(),
    postcssPresetsEnv({
      stage: 2
    }),
    cssnano({
      preset: 'default',
    }),
  ]
}

module.exports = config
