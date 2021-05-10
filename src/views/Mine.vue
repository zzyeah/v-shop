<template>
  <div class="mine-container">
    <van-nav-bar title="账号管理" />
    <div class="user" @click="onLogin">
      <div class="user-avator">
        <img
          src="http://mdrs.yuanjin.tech/img/20201031141350.jpg"
          alt="头像"
          class="avator"
        />
      </div>
      <div class="user-login__status">
        <template v-if="true">
          <van-cell title="登录/注册" />
        </template>
        <template v-else>
          <van-cell title="用户名" />
        </template>
      </div>
      <van-icon name="arrow" size=".5rem" class="arrow" />
    </div>
    <my-models />
    <div class="logout" @click="onLogout">
      <van-button type="danger" size="small">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import MyModels from '../components/MyModels.vue';

export default {
  components: { MyModels },
  methods: {
    onLogin() {
      this.$router.push({
        name: 'login',
      });
    },
    onLogout() {
      console.log('登出操作');
    },
  },
};
</script>

<style lang="less" scoped>
.mine-container {
  position: relative;
  .user {
    display: flex;
    justify-content: start;
    box-sizing: border-box;
    border-bottom: 1px solid;
    padding: 0.3rem 0;
    position: relative;
    margin: 0 auto;
    .user-avator {
      padding-left: 0.3rem;
      .avator {
        width: 1.3rem;
        height: 1.3rem;
        display: block;
        margin: 0 auto;
      }
    }
    .user-login__status {
      width: 100%;
      height: 1.3rem;
      line-height: 1.3rem;
    }
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #000;
      right: 0;
    }
  }
  .func-model {
    display: flex;
    flex-direction: column;
    .history {
      display: block;
    }
    .address {
      display: block;
    }
  }
  .logout{
    position: absolute;
    top: 80vh;
    left: 50%;
    transform: translate(-50%, 0);
  }
}
</style>
