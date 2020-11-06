<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <main-tabbar class="tabbar" />
  </div>
</template>

<script>
  import MainTabbar from '@/components/content/tabbar/MainTabbar'

  export default {
    name: 'App',
    components: {
      MainTabbar
    }
  }
</script>
<style>
  @import "./assets/css/base.css";

  .tabbar {
    position: fixed;
    bottom: 0;
    z-index: 5;
  }
</style>