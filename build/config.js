const path = require('path')
const nodeExternals = require('webpack-node-externals')
let externals = {}

externals = [
  {
    vue: 'vue'
  },
  nodeExternals()
]

exports.externals = externals

exports.alias = {
  src: path.resolve(__dirname, '../src'),
  '~': path.resolve(__dirname, '../packages'),
  '@': path.resolve(__dirname, '../examples'),
  'fnb-element-ui': path.resolve(__dirname, '../'),
  types: path.resolve(__dirname, '../types')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}
