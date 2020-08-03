<template>
  <div>
    <common-attribute
      title="AppConatienr Attributes"
      type="attr"
      :data="appAttrData"
    ></common-attribute>
    <common-attribute
      title="SearchContainer Attributes"
      type="attr"
      :data="searchAttrData"
    ></common-attribute>
    <common-attribute
      title="ScrollContainer Attributes"
      type="attr"
      :data="scrollAttrData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      appAttrData: [
        {
          name: 'fixedHeigth',
          desc: `是否固定高度`,
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'height',
          desc: `当 <code>fixedHeigth</code> 为 true 时，height生效`,
          type: 'string',
          default: '窗口减去顶部使用高度后的剩余高度'
        }
      ],

      searchAttrData: [
        {
          name: 'last-item-form',
          desc: `最后一行是否是form-item 组件，为了重置margin-bottom`,
          type: 'boolean',
          default: 'false'
        }
      ],

      scrollAttrData: [
        {
          name: 'height',
          desc: `滚动区域的高度，不设置的话，为100%`,
          type: 'number',
          default: '0'
        },
        {
          name: 'scroll-y',
          desc: `是否允许上下滚动`,
          type: 'boolean',
          default: 'true'
        },
        {
          name: 'scroll-x',
          desc: `是否允许左右滚动`,
          type: 'boolean',
          default: 'false'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
