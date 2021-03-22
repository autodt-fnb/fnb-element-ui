const merge = require('merge')
const path = require('path')

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
    sidebarDepth: 2,
    nav: [
      { text: 'Github', link: 'https://github.com/autodt-fnb/fnb-element-ui' }
    ],
    sidebar: [
      '/',
      '/quickstart',
      {
        title: '自定义指令',
        collapsable: false,
        children: [['/directives/clipboard', 'Clipboard 剪切板']]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          ['/component/layout', '布局容器'],
          ['/component/select-goods', 'SelectGoods 商品搜索选择'],
          ['/component/table', 'Table 表格'],
          ['/component/table-button', 'TableButton 表格操作按钮'],
          {
            title: 'Form 表单',
            path: '/component/form/index.html',
            collapsable: true,
            children: [
              [
                '/component/form/render-form-content',
                'RENDER_FORM_CONTENT 自定义内容'
              ],
              ['/component/form/input', 'INPUT 输入框'],
              ['/component/form/amount-input', 'AMOUNT_INPUT 金额输入框'],
              [
                '/component/form/input-number',
                'INPUT_NUMBER 数字输入框/计数器'
              ],
              [
                '/component/form/autocomplete',
                'AUTOCOMPLETE 带输入建议的输入框'
              ],
              ['/component/form/select', 'SELECT 选择框'],
              ['/component/form/date-picker', 'DATE_PICKER 日期选择'],
              ['/component/form/time-picker', 'TIME_PICKER 任意时间选择'],
              ['/component/form/time-select', 'TIME_SELECT 固定时间选择'],
              ['/component/form/switch', 'SWITCH 开关'],
              ['/component/form/checkbox', 'CHECKBOX 多选框'],
              ['/component/form/checkbox-group', 'CHECKBOX_GROUP 多选框组'],
              ['/component/form/radio', 'RADIO 单选框'],
              ['/component/form/radio-group', 'RADIO_GROUP 单选框组'],
              ['/component/form/cascader', 'CASCADER 级联选择'],
              ['/component/form/upload', 'UPLOAD 媒体上传']
            ]
          },
          ['/component/search-form', 'SearchForm 搜索表单'],
          ['/component/iconfont', 'Iconfont 字体图标'],
          ['/component/plate-number', 'PlateNumber 车牌号'],
          ['/component/amount-input', 'AmountInput 金额输入框'],
          ['/component/date-range', 'DateRange 日期范围选择'],
          ['/component/upload', 'Upload 媒体上传']
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
  ],
  chainWebpack: (config, isServer) => {
    config.resolve.alias.set(
      '@autodt/fnb-element-ui',
      path.join(__dirname, '../../lib')
    )
  }
}
