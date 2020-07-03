<template>
  <div class="code">
    <div class="code--title">
      <h2>{{ title }}</h2>
      <small v-html="description"></small>
    </div>
    <div class="code--content">
      <div class="code--demo">
        <slot></slot>
      </div>
      <div v-if="isShow" class="code--segment">
        <slot name="codeText"></slot>
      </div>
      <div
        v-if="$slots.codeText"
        class="code--button"
        :style="{ position: isShow ? 'sticky' : 'static', bottom: 0 }"
        @click="handleToggleShow"
      >
        {{ codeTextBtn }}
        <i :class="[`el-icon-caret-${isShow ? 'top' : 'bottom'}`]"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonDemocode',
  props: ['title', 'description'],
  data() {
    return {
      isShow: false,
      codeTextBtn: '显示代码'
    }
  },
  methods: {
    handleToggleShow() {
      this.isShow = !this.isShow
      this.codeTextBtn = this.isShow ? '隐藏代码' : '显示代码'
    }
  }
}
</script>

<style lang="scss" scoped>
.code {
  &--title {
    h2 {
      padding: 0;
      margin: 0;
      border-bottom: none;
      font-size: 18px;
    }
    small {
      font-size: 14px;
      display: inline-block;
      margin: 10px 0;
      color: #5e6d82;
    }
  }

  &--content {
    border: 1px solid #ebeef5;
    background-color: #fafafa;
    color: #303133;
    transition: 0.3s;
    border-radius: 4px;
  }

  &--demo {
    box-sizing: border-box;
    padding: 20px;
    background-color: #fff;
    border-bottom: 1px solid #eaeefb;
  }

  &--button {
    border-top: 1px solid #eaeefb;
    height: 44px;
    line-height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }
  }
  & + .code {
    margin-top: 40px;
  }
  &:not(:first-child) {
    margin-top: 40px;
  }
}
</style>
