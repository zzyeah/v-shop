<template>
  <div class="my-models-container">
    <div class="model">
      <router-link class="address" :to="{name: 'address'}">
        <div class="ordering">
          <van-cell title="地址管理" />
          <van-icon name="arrow" size=".5rem" class="arrow" />
        </div>
      </router-link>
    </div>
    <div class="func-model">
      <div class="model">
        <router-link class="history" :to="{name: 'history'}">
          <div class="ordering">
            <van-cell title="历史记录" />
            <van-icon name="arrow" size=".5rem" class="arrow" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.model {
    border-bottom: 1px solid;
  .ordering {
    display: flex;
    position: relative;
    .arrow {
      position: absolute;
      color: #000;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }
  }
}

</style>
