module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', { useBuiltIns: 'entry' }],
    [
      '@vue/babel-preset-jsx',
      {
        injectH: false
      }
    ]
  ]
}
