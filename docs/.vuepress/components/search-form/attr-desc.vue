<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes' target='_blank' rel='noopener noreferrer'>Checkbox Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
      type="attr"
      :data="attrData"
    ></common-attribute>

    <common-attribute
      title="Events"
      type="event"
      :data="eventData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData: [
        {
          name: 'listItems',
          desc:
            'form item 列表，参考 <a target="_blank" href="/fnb-element-ui/component/form/#Form%20Item%20listItems%20props">fnb-form-item 的 listItems 属性</a>',
          optional: `<code>CHECKBOX</code>`,
          type: 'array'
        },
        {
          name: 'defaultExpand',
          desc: '默认是否展开搜索',
          type: 'boolean',
          default: 'true'
        }
      ],
      eventData: [
        {
          name: 'search',
          desc: '点击搜索按钮事件',
          params: '表单数据参数'
        },
        {
          name: 'reset',
          desc: '点击重置按钮事件',
          params: '表单数据参数'
        },
        {
          name: 'expand',
          desc: '点击展开/收起按钮事件',
          params: '是否展开，true 展开，false：收起'
        }
      ]
    }
  }
}
</script>
