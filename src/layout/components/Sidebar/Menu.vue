<template>
  <el-menu
    class="custom-menu-container"
    :class="{ 'no-expand-menu-container': collapse }"
    :default-active="$route.path"
    :collapse="collapse"
    :collapse-transition="false"
    :router="true"
    background-color="#304156"
    active-text-color="#409EFF"
    mode="vertical"
  >
    <template v-for="route in formattedRoutes">
      <template v-if="!route.children">
        <!-- 渲染单个子路由 -->
        <el-menu-item :key="route.path" :index="route.path">
          <i :class="`el-icon-${route.meta.icon}`" class="menu-icon"></i>
          <template #title>{{ route.meta.title }}</template>
        </el-menu-item>
      </template>

      <!-- 渲染包含多子路由的菜单 -->
      <template v-else>
        <el-submenu :key="route.path" :index="route.path" popper-class="custom-popper">
          <template #title>
            <i :class="`el-icon-${route.meta.icon}`" class="menu-icon"></i>
            <span>{{ route.meta.title }}</span>
          </template>
          <el-menu-item
            v-for="childRoute in route.children"
            :key="childRoute.path"
            class="nest-menu"
            :index="childRoute.path"
          >
            <i :class="`el-icon-${childRoute.meta.icon}`" class="menu-icon"></i>
            <template #title>{{ childRoute.meta.title }}</template>
          </el-menu-item>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script>
import currentRoutes from '@/router/routes'

export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    formattedRoutes() {
      return this.formatRoutes(currentRoutes)
    }
  },

  methods: {
    formatRoutes(routes, parentPath = '') {
      // 过滤出非隐藏的路由
      return routes
        .filter(route => !route.hidden)
        .map(route => {
          const formattedRoute = {
            ...route,
            path: route.redirect ? route.redirect : this.resolvePath(parentPath, route.path),
            children: route.children ? this.formatRoutes(route.children, route.path) : null
          }

          // 如果没有title且只有一个子路由，将子路由的属性合并到父级路由
          if (formattedRoute?.children?.length === 1 && !formattedRoute?.meta?.title) {
            const childRoute = formattedRoute.children[0]
            formattedRoute.meta = {
              ...formattedRoute.meta,
              ...childRoute.meta
            }
            formattedRoute.children = null
          }

          return formattedRoute
        })
    },

    // 解析并拼接基础路径和路由路径，生成菜单链接
    resolvePath(basePath, routePath) {
      if (!basePath) return routePath
      if (basePath.endsWith('/')) return `${basePath}${routePath}`
      return `${basePath}/${routePath}`
    }
  }
}
</script>

<style lang="scss" scoped>
/* 折叠悬浮弹窗样式 */
.custom-popper {
  .nest-menu.el-menu-item {
    color: $color-gray;

    /* 菜单图标样式 */
    .menu-icon {
      margin-right: 16px;
      color: $color-gray;
      font-size: 18px;
    }

    &.is-active {
      color: $color-blue;

      .menu-icon {
        color: $color-blue;
      }
    }
  }
}

.custom-menu-container {
  /* 菜单图标样式 */
  .menu-icon {
    margin-right: 16px;
    color: $color-gray;
    font-size: 18px;
  }

  /* 收缩菜单样式 */
  &.no-expand-menu-container {
    width: auto;

    .menu-icon {
      margin: 0;
    }
  }
}

.custom-menu-container.el-menu {
  border-right: none;

  :deep {
    .el-menu-item {
      display: flex;
      align-items: center;
      padding: 0 18px;
      color: $color-gray;
      background-color: $menuBg;

      &:hover {
        background-color: $menuHover !important;
      }

      &.is-active {
        color: $color-blue;

        .menu-icon {
          color: $color-blue;
        }
      }

      .el-menu-tooltip__trigger {
        padding: inherit;
      }
    }

    .el-submenu {
      background-color: $color-dark;

      .el-submenu__title {
        display: flex;
        align-items: center;
        padding: 0 18px;
        color: $color-gray;

        &:hover {
          background-color: $menuHover !important;
        }
      }

      .el-submenu__icon-arrow {
        margin-top: -6px;
        color: #909399;
      }

      .nest-menu.el-menu-item {
        padding: 0 45px;
        background-color: $subMenuBg !important;

        &:hover {
          background-color: $subMenuHover !important;
        }
      }
    }
  }
}
</style>
