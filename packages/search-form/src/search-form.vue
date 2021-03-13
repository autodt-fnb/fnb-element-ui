<template>
  <SearchContainer last-form-item>
    <Form ref="form" :gutter="10" :cols="3" label-width="auto" v-model="form">
      <FormItem :listItems="list" />
    </Form>
  </SearchContainer>
</template>

<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-03-09 17:52:30
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-13 21:00:00
 */
import { FnbForm } from '@autodt/fnb-element-ui/types/form'
import { FormItemProps } from '@autodt/fnb-element-ui/types/form-item'
import { FnbTable } from '@autodt/fnb-element-ui/types/table'
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import Form from '~/form'
import FormItem from '~/form-item'
import { FormItemType } from '@autodt/fnb-element-ui/src/enum/form-item'
import SearchContainer from '~/search-container'

@Component({
  name: 'FnbSearchForm',
  inheritAttrs: false,
  components: { SearchContainer, Form, FormItem }
})
export default class SearchForm extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly listItems!: FormItemProps[]

  /** 是否是默认展开 */
  @Prop({ type: Boolean, default: true }) defaultExpand!: boolean

  get list(): FormItemProps[] {
    return [
      ...this.listItems.map((item, index) => {
        if (index > 1) {
          return { ...item, invisible: !this.visible }
        } else {
          return item
        }
      }),
      {
        itemLabelWidth: '0',
        formType: FormItemType.RENDER_FORM_CONTENT,
        render: form => {
          return (
            <el-row justify="end" type="flex">
              <el-button
                type="primary"
                onClick={() => this.$emit('search', form)}
              >
                搜索
              </el-button>
              <el-button
                onClick={() => {
                  this.formRef.resetFields()
                  this.$emit('reset', form)
                }}
              >
                重置
              </el-button>
              <el-button
                icon={this.visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}
                type="text"
                onClick={() => this.handleVisible()}
              >
                {this.visible ? '收起' : '展开'}
              </el-button>
            </el-row>
          )
        }
      }
    ]
  }

  form: Record<string, any> = {}

  /**
   * 是否全部可见，展开/收起
   */
  visible: boolean = true

  @Ref('form') readonly formRef!: FnbForm

  created() {
    this.visible = this.defaultExpand
  }

  handleVisible() {
    this.visible = !this.visible
    const table = this.$parent?.$children.find(
      v =>
        (v.$options.name === 'FnbTable' && (v as FnbTable).autoMaxHeight) ||
        v.$options.name === 'FnbRemoteTable'
    ) as FnbTable
    if (table.$options.name === 'FnbTable') {
      table?.updateMaxHeight()
    } else {
      table?.updateMaxHeight()
    }
    this.$emit('expand', this.visible)
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-form {
    > .el-row {
      > .el-col:last-child {
        float: right;
      }

      .el-form-item--small.el-form-item {
        margin-bottom: 10;
      }
    }
  }
}
</style>