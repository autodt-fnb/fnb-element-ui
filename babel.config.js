module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        jsx: {
          compositionAPI: true
        }
      }
    ]
  ]
}
