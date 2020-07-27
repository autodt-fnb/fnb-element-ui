<script lang="tsx">
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
  margin-bottom: 20px;
  background-color: #e5ebf1;

  ::v-deep {
    .el-card__body {
      padding: 15px 20px;
    }
  }

  &.card ::v-deep {
    .el-card__body {
      padding: 15px 20px 0;
      margin-bottom: -7px;
    }
  }
}
</style>
