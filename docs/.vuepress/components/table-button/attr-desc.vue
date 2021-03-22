<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/button#attributes' target='_blank' rel='noopener noreferrer'>Button Attributes</a> 全部可用（除 type 属性，这里固定为 text），这里列举新添加字段`"
      type="attr"
      :data="attrData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      attrData: [
        {
          name: 'divider',
          desc: `添加分割符在 button 的前面还是后面，一般情况下 <b>不需要</b> 写该属性，内部已判断相邻 taeble-button 组件，自动添加分隔符。`,
          optional: `<code>before</code>，<code>after</code>`,
          type: 'string'
        },
        {
          name: 'color',
          desc: '自定义文字按钮的颜色',
          type: 'string'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
