<template>
  <div>
    <common-attribute
      title="Attributes"
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
          name: 'name',
          desc: `图标名称，阿里 iconfont 字体图标可以不加 <code>icon-</code> 前缀，element-ui字体图标必须完整的名字，即必须有 <code>el-icon-</code> 前缀。`,
          type: 'string'
        },
        {
          name: 'size',
          desc: '图标大小，单位 <code>px</code>',
          type: 'number'
        },
        {
          name: 'color',
          desc: '颜色',
          type: 'string'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
