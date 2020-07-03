<script>
// 兼容初始 theme-default-content 没加载
export default {
  mounted() {
    const node = document.querySelector('.page > .content__default')
    if (node && !node.className.includes('theme-default-content')) {
      node.classList.add('theme-default-content')
    }
  },
  render(h) {
    return h()
  }
}
</script>
