<template>
  <div class="login-container">
    <van-icon name="cross" class="cross" @click="$router.goBack()" />
    <login-card />
  </div>
</template>

<script>
import LoginCard from '../components/LoginCard.vue';

export default {
  components: { LoginCard },
};
</script>

<style lang="less" scoped>
.cross{
  position: relative;
  left: 4vw;
  top: 2vh;
  font-size: 0.55rem;
}
.login-container{
  background: #fff;
  height: 100vh;
  z-index: 10;
  width: 100vw;
}
</style>
