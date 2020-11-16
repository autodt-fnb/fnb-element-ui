<template>
  <div>
    <common-attribute
      title="Attributes"
      type="attr"
      :description="
        `element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/upload#attribute' target='_blank' rel='noopener noreferrer'>Upload Attributes</a> 可用（<code>list-type</code>已写死为 <code>picture-card</code>）`
      "
      :data="attrData"
    ></common-attribute>

    <common-attribute
      title="Table Methods"
      :description="
        `element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/upload#methods' target='_blank' rel='noopener noreferrer'>Upload Methods</a> 全部可用。`
      "
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData: [
        {
          name: 'v-model/value',
          desc: `已上传 url 集合，可为 <code>string[]</code> 或者 <code>string</code>。当为字符串类型时，值为逗号分割的字符串,默认为string类型`,
          type: 'string | string[]'
        },
        {
          name: 'name',
          desc: '上传的文件字段名',
          type: 'string',
          default: 'image'
        },
        {
          name: 'preview',
          desc: '是否显示预览按钮',
          type: 'boolean',
          default: 'true'
        },
        {
          name: 'width',
          desc: '宽度',
          type: 'number',
          default: '148'
        },
        {
          name: 'height',
          desc: '高度',
          type: 'number',
          default: '148'
        }
      ]
    }
  }
}
</script>
