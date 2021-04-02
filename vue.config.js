/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  devServer: {
    host: 'localhost',
    port: 8369,
    hot: true
  },
  configureWebpack: {
    devtool: 'eval-cheap-source-map'
  },
  chainWebpack: config => {
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))
      .set('@autodt/fnb-element-ui', path.resolve('.'))
      .set('types', path.resolve('types'))

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./examples/main.ts').end()
    })
  }
}
