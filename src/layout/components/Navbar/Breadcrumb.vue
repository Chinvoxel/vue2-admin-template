<template>
  <el-breadcrumb class="breadcrumb-container" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
        <span v-if="index === breadcrumbList.length - 1">
          {{ item.meta.title }}
        </span>

        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbList: []
    }
  },

  watch: {
    $route: {
      handler() {
        this.getBreadcrumb()
      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta?.title) || [] // 过滤出具有元信息和标题的路由匹配项
      const first = matched[0] // 取第一个匹配项
      // 如果第一个匹配项不是首页
      if (!this.isDashboard(first)) {
        // 在匹配项数组前添加一个“首页”路由项
        matched = [{ path: '/home/index', meta: { title: 'route.home' } }].concat(matched)
      }

      // 将符合条件的匹配项过滤为只包含元信息、标题的项
      this.breadcrumbList = matched.filter(item => item.meta?.title)
    },

    isDashboard(route) {
      const name = route && route.name
      if (!name) return false
      return name.trim().toLocaleLowerCase() === 'home'.toLocaleLowerCase()
    },

    handleLink(route) {
      const { redirect, path } = route
      const toLink = redirect || path
      this.$router.push(toLink)
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  margin-left: 8px;
}
</style>
