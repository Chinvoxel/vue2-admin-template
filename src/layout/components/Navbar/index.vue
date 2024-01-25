<template>
  <div class="navbar">
    <Hamburger :is-active="collapsed" @toggle="toggleSideBar" />
    <Breadcrumb />
    <AvatarIcon class="avatar-container" />
  </div>
</template>

<script>
import Hamburger from './Hamburger.vue'
import Breadcrumb from './Breadcrumb.vue'
import AvatarIcon from './AvatarIcon.vue'

export default {
  components: {
    Hamburger,
    Breadcrumb,
    AvatarIcon
  },
  computed: {
    collapsed() {
      return this.$store.getters.collapsed
    }
  },

  methods: {
    toggleSideBar() {
      this.$store.commit('TOGGLE_SIDEBAR')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  z-index: 9;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-right: 15px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: width 0.28s;

  .language-container {
    margin-left: auto;
  }

  .avatar-container {
    margin-left: auto;
  }
}
</style>
