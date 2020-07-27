module.exports = {
  title: 'fnb-element-ui',
  description: 'Vue 组件库',
  port: '8379',
  base: '/fnb-element-ui/',
  head: [
    [
      'link',
      { rel: 'shortcut icon', type: 'image/x-icon', href: `./favicon.ico` }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://at.alicdn.com/t/font_1478682_k11j68pk13.css'
      }
    ]
  ],
  themeConfig: {
    logo: '/logo.png',
    sidebarDepth: 0,
    sidebar: [
      '/',
      '/quickstart',
      {
        title: '组件',
        collapsable: false,
        children: [
          ['/component/layout', '布局容器'],
          ['/component/select-goods', 'SelectGoods 商品搜索选择'],
          ['/component/table', 'Table 表格'],
          ['/component/iconfont', 'Iconfont 字体图标'],
          ['/component/plate-number', 'PlateNumber 车牌号'],
          ['/component/date-range', 'DateRange 日期范围选择']
        ]
      }
    ]
  },
  plugins: [
    [
      'vuepress-plugin-container',
      {
        type: 'code',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>'
      }
    ]
  ]
}
