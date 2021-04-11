<template>
  <div class="pur-history">
    <div class="top-nav">
      <van-nav-bar title="历史记录" />
    </div>
    <div class="card-list"
    >
    <div class="card-box"
    v-for="item in list"
    :key="item.id"
    >
      <goods-card
      v-bind="item"
      :num="purchaseMap[item.id]"
      :nofly="true"
      :selshow="false"
      ></goods-card>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from '../components/GoodsCard.vue';

export default {
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState({
      purchaseMap: (state) => state.purchaseMap,
    }),
  },
  components: {
    goodsCard,
  },
  methods: {
    async getAllData() {
      const result = Object.keys(this.purchaseMap);
      const res = await this.$api.getGoodsByIds(result.join());
      this.list = res.list;
    },
  },
  created() {
    this.getAllData();
  },
};
</script>

<style lang="less">
.pur-history {
  background: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    position: absolute;
    top: 46px;
    z-index: 0;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    .card-box {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
