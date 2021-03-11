<script lang="tsx">
/*
 * @Author: 陈超
 * @Date: 2021-02-21 00:02:39
 * @Last Modified by: 陈超
 * @Last Modified time: 2021-03-09 23:22:54
 */
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'FnbSearchContainer' })
export default class SearchContainer extends Vue {
  // 最后一行是否是form-item 组件，为了重置margin-bottom
  @Prop({ type: Boolean }) lastFormItem!: boolean

  render() {
    return (
      <el-card
        class={`search-container ${this.lastFormItem ? 'card' : ''}`}
        {...{ on: this.$listeners }}
      >
        {this.$slots.default}
      </el-card>
    )
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  margin-bottom: 10px;
  background-color: #e5ebf1;

  ::v-deep {
    .el-card__body {
      padding: 10px;
    }
  }

  &.card ::v-deep {
    .el-card__body {
      padding: 10px 10px 0;
      margin-bottom: -8px;
      overflow: hidden;
    }
  }
}
</style>
