<template>
  <div class="classify-wrapper">
    <router-link class="search-btn" tag="div" to="/search">
      <van-icon name="search" />
      <div>苹果特价1元1斤</div>
    </router-link>
   <one-tab @handlerChange="getSide"></one-tab>
    <!-- <template v-if="showContent"> -->
      <div class="classify-content" v-if="show">
        <side-bar></side-bar>
      <goods-list></goods-list>
      </div>
    <!-- </template> -->
    <van-loading size="2rem" vertical v-else />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import oneTab from '../components/OneTab.vue';
import sideBar from '../components/SideBar.vue';
import goodsList from '../components/GoodsList.vue';

export default {
  async created() {
    this.resetGoodsList();
    await this.getSideList(this.value);
    this.listShow = true;
  },
  data() {
    return {
      value: '时令水果',
      show: true,
    };
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList,
      goodsList: (state) => state.goodsList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getSideList']),
    getSide(value) {
      this.show = false;
      this.getSideList(value).then(() => {
        setTimeout(() => {
          this.show = true;
        }, 500);
      });
    },
  },
  components: {
    oneTab,
    sideBar,
    goodsList,
  },
  watch: {
    // showContent() {
    //   if (this.showContent) {
    //     console.log(this.goodsList);
    //     this.resetGoodsList();
    //     this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
    //   }
    // },
  },
};
</script>

<style lang="less" scoped>
.classify-wrapper {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 33px;
    line-height: 33px;
    background-color: #eee;
    margin: 11px auto 0;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    color: #a1a1a1;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
