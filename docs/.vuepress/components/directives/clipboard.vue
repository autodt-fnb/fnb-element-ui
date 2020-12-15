<template>
  <div>
    <el-row type="flex">
      <el-input v-model="input" placeholder="请输入复制的内容"></el-input>
      <el-button v-clipboard="input" v-clipboard:success="handleClipSuccess"
        >复制</el-button
      >
    </el-row>
    <el-row style="margin-top: 20px">
      <el-input
        v-model="input2"
        placeholder="粘贴复制的内容"
        clearable
      ></el-input>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: 'http://docs.yangchebyd.com/',
      input2: ''
    }
  },
  methods: {
    handleClipSuccess() {
      this.$message.success('复制成功')
    }
  }
}
</script>
