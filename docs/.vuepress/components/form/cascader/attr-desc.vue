<template>
  <div>
    <common-attribute
      title="Attributes"
      :description="`element-ui 的 <a href='https://element.eleme.cn/#/zh-CN/component/cascader#cascader-attributes' target='_blank' rel='noopener noreferrer'>Cascader Attributes</a> 全部可用，这里列举除 FormItem 组件通用属性外，新添加字段和改变的字段`"
      type="attr"
      :data="attrData"
    ></common-attribute>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attrData: [
        {
          name: 'formType',
          desc: '表单类型，固定填写 <code>CASCADER</code>',
          optional: `<code>CASCADER</code>`,
          type: 'string'
        },
        {
          name: 'field',
          desc: '表单数据对象 属性名称',
          type: 'string | string[]',
          default: '使用 <code>prop</code> 字段值'
        },
        {
          name: 'checkStrictly',
          desc:
            '是否严格的遵守父子节点不互相关联，与 props 属性里面的字段相同，但是会覆盖 props 里的属性。',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'multiple',
          desc:
            '是否多选，与 props 属性里面的字段相同，但是会覆盖 props 里的属性。',
          type: 'boolean',
          default: 'false'
        },
        {
          name: 'emitPath',
          desc:
            '在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值，与 props 属性里面的字段相同，但是会覆盖 props 里的属性。',
          type: 'boolean',
          default: 'true'
        },
        {
          name: 'ref',
          desc: '获取选中节点是填写的唯一ref',
          type: 'string'
        },
        {
          name: 'leafOnly',
          desc: '获取选中的节点时，是否只是叶子节点',
          type: 'boolean',
          default: 'true'
        },
        {
          name: 'getCheckedNodes',
          desc:
            '当选中值改变时，获取选中的节点, 返回选中节点的数组，同 Cascader Methods getCheckedNodes，参数是上面的 leafOnly 属性',
          type: 'function'
        },
        {
          name: 'render',
          desc: '自定义内容',
          type:
            '(e: { node: CascaderNode<V, D>; data: D[] }) => (VNode | JSX.Element)'
        },
        {
          name: '无匹配选项时的内容',
          desc: '自定义内容',
          type: '() => (VNode | JSX.Element)'
        },
        {
          name: 'onChange',
          desc: `当绑定值变化时触发的事件，原 el-checkbox <code>change</code> event`,
          type: '(value) => void'
        }
      ]
    }
  }
}
</script>
