<template>
  <div class="address-edit-container">
    <van-nav-bar title="修改地址" left-arrow @click-left="onClickLeft" class="title"/>
    <van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      areaList: {},
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast('save');
    },
    onDelete() {
      Toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onClickLeft() {
      this.$router.goBack();
    },
  },
};
</script>

<style lang="less" scoped>
.address-edit-container{
  height: 100vh;
  width: 100vw;
    background: #fff;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: 0px;
    z-index: 10;
    .title{
      z-index: 11;
    }
}
</style>
