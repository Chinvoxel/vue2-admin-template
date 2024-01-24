<template>
  <el-dropdown class="avatar-container" trigger="click">
    <el-avatar :src="website.logo" :size="40" />

    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/login">
          <el-dropdown-item>Action 1</el-dropdown-item>
        </router-link>
        <router-link to="/login">
          <el-dropdown-item>Action 1</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
import website from '@/config/website'
import store from '@/store'

export default {
  data() {
    return {
      website
    }
  },

  methods: {
    logout() {
      store.dispatch('FedLogout').then(() => {
        this.$router.replace({ name: 'Login' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  height: 40px;
}
</style>
