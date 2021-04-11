<template>
  <div>
    <router-view> </router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
/* eslint-disable */
import tabBar from "../components/TabBar.vue";

export default {
  /* eslint-disable */
  components: {
    tabBar,
  },
};
</script>

<style>
</style>
