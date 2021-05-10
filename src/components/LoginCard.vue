<template>
  <div class="login">
    <van-form v-model="formVal" ref="form" :rules='rules'>
      <van-field
        class="user"
        v-model="formVal.username"
        name="username"
        placeholder="用户名"
        error-message-align="center"
        autofocus="true"
        ref="user"
        validate-trigger="onChange"
        :rules="[
          { pattern, message: '请勿输入非法字符', trigger: 'onChange' },
          { required: true, message: '请输入用户名' },
        ]"
      />
      <van-field
        class="password"
        v-model="formVal.password"
        type="password"
        name="password"
        placeholder="密码"
        ref="password"
        error-message-align="center"
        :rules="[
          { pattern, message: '请勿输入非法字符', trigger: 'onChange' },
          { required: true, message: '请输入密码' },
        ]"
      />
      <div style="margin: 16px">
        <van-row type="flex" justify="center">
          <van-col span="8">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="onLogin"
              >登录</van-button
            >
          </van-col>
          <van-col span="8" style="margin-left: 5px">
            <van-button
              round
              block
              type="info"
              @click="onReg"
              native-type="submit"
              >注册</van-button
            >
          </van-col>
        </van-row>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      formVal: {
        username: '',
        password: '',
      },
      rules: {
        password: [
          { pattern: /^[^`~!#$%^&*+=\\|{};:"',/<>?]*$/, message: '请勿输入非法字符', trigger: 'onChange' },
          { required: true, message: '请输入用户名' },
        ],
        email: [
          { pattern: /^[^`~!#$%^&*+=\\|{};:"',/<>?]*$/, message: '请勿输入非法字符', trigger: 'onChange' },
          { required: true, message: '请输入密码' },
        ],
      },
      pattern: /^[^`~!#$%^&*+=\\|{};:"',/<>?]*$/,
    };
  },
  methods: {
    onLogin() {
      this.$refs.form.validate(['username', 'password']).then(() => {
        console.log('登录');
      }).catch(() => Toast('请输入登录信息'));
    },
    onReg() {
      this.$refs.form.validate(['username', 'password']).then(() => {
        console.log('注册');
      }).catch(() => Toast('请输入登录信息'));
    },
  },
};
</script>

<style lang="less">
.van-field__error-message {
  background: rgba(19, 18, 17, 0.061);
  border-radius: 10px;
}
.van-field__body {
  border-bottom: 1px solid #d9d9d9;
  position: relative;
  padding-left: 10px;
}
</style>
<style lang="less" scoped>
div{
  font-size: 0.35rem;
}
.login {
  margin-top: 25vh;
  .user,
  .password {
    width: 95vw;
    margin: 0 auto;
  }
}
</style>
