<template>
  <fnb-app-container>
    <div>
      未设置 last-form-item，由于使用了
      <code>el-form-item</code> 组件，底部留空变大
    </div>
    <fnb-search-container>
      <el-form label-width="auto">
        <el-form-item label="测试：">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </fnb-search-container>
    <div>已设置 last-form-item</div>
    <fnb-search-container last-form-item>
      <el-form label-width="auto">
        <el-form-item label="测试：">
          <el-input placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
    </fnb-search-container>
  </fnb-app-container>
</template>
