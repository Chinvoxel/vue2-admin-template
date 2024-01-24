<template>
  <main class="app-main">
    <transition name="page" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="page" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </main>
</template>

<script></script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 20px;
  overflow: hidden;
}
</style>
