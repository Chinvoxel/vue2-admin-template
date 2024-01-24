<template>
  <div class="sidebar-container">
    <AppLogo :collapse="collapsed" />

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <AppMenu :collapse="collapsed" />
    </el-scrollbar>
  </div>
</template>

<script>
import AppLogo from './Logo.vue'
import AppMenu from './Menu.vue'

export default {
  components: {
    AppLogo,
    AppMenu
  },
  computed: {
    collapsed() {
      return this.$store.getters.collapsed
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 100%;
  height: 100vh;
  background-color: #304156;

  :deep {
    .el-scrollbar {
      height: calc(100vh - 50px);

      .scrollbar-wrapper {
        overflow-x: hidden !important;
      }
    }
  }
}
</style>
