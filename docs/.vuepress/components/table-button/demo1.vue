<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <fnb-table-button>按钮1</fnb-table-button>
        <fnb-table-button>按钮2</fnb-table-button>
        <fnb-table-button color="red">按钮3</fnb-table-button>
      </el-col>
      <el-col :span="8">
        <fnb-table-button>按钮1</fnb-table-button>
        <span></span>
        <fnb-table-button color="red">按钮2</fnb-table-button>
        <span></span>
        <fnb-table-button>按钮3</fnb-table-button>
      </el-col>
      <el-col :span="8">
        <fnb-table-button divider="after" color="red">按钮1</fnb-table-button>
        <span></span>
        <fnb-table-button divider="after">按钮2</fnb-table-button>
        <span></span>
        <fnb-table-button>按钮3</fnb-table-button>
      </el-col>

      <el-col :span="8"> 相邻组件，自动有分隔符 </el-col>

      <el-col :span="8"> 不相邻组件，没有分隔符 </el-col>

      <el-col :span="8"> 不相邻组件，添加divider属性，有分隔符 </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>
