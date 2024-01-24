<template>
  <div class="app-container">
    <Sidebar class="sidebar-container" :style="{ width: sidebarWidth }" />
    <section class="main-container" :style="{ left: sidebarWidth }">
      <Navbar />
      <AppMain />
    </section>
  </div>
</template>

<script>
import store from '@/store'
import { Navbar, AppMain, Sidebar } from './components'

export default {
  components: {
    Navbar,
    AppMain,
    Sidebar
  },
  computed: {
    sidebarWidth() {
      return store.getters.collapsed ? '54px' : '210px'
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .sidebar-container {
    z-index: 1001;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transition: width 0.28s;
  }
  .main-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    transition: left 0.28s;
  }
}
</style>
