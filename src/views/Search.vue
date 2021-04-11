<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
        autofocus
      >
        <template #action v-if="showList">
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon
            name="cart-o"
            id="shop-car"
            class="shop-car"
            :badge="badge"
            @click="$router.push('home/shopping')"
          />
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="likeList.length && showList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <!-- v-html用于识别搜索词，然后将对应搜索词变色 -->
            <span class="custom-title" v-html="formatHtml(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="!showList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有了"
        @load="onLoad"
      >
        <goods-card
          v-for="item in goodsList"
          :key="item.id"
          v-bind="item"
          :num="counterMap[item.id]"
          :selshow="true"
        ></goods-card>
      </van-list>
    </div>
    <div class="my-histroy" v-if="likeList.length <= 0 && showList">
      <my-history :searchList="searchList" @search="onSearch"></my-history>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import goodsCard from '../components/GoodsCard.vue';
import myHistory from '../components/MyHistory.vue';

export default {
  components: {
    goodsCard,
    myHistory,
  },
  data() {
    return {
      place: '酒',
      value: '',
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      showList: true, // 控制显示点击后的搜索结果
      total: 0,
      searchList: [],
    };
  },
  computed: {
    ...mapState({
      counterMap: (state) => state.counterMap,
    }),
    badge() {
      const count = Object.values(this.counterMap).reduce(
        (prev, next) => prev + next,
        0,
      );
      if (count > 99) {
        // 处理购物车数量
        return '99+';
      }
      return count;
    },
  },
  methods: {
    // 不应该一开始就进行展示，需要判断
    onLoad() {
      this.page += 1;
      this.$api
        .search(this.value, this.page, this.size)
        .then((data) => {
          this.goodsList = [...this.goodsList, ...data.list];
          this.total = data.total;
          this.loading = false;
          if (this.goodsList.length >= this.total) {
            this.finished = true;
          }
        });
    },
    onSearch(val) {
      if (val) this.value = val;
      if (this.value === '') this.value = this.place;
      // 匹配
      this.finished = false;
      this.likeList = [];
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        // 最新搜索的时间
        // 降序排列
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        // 将数据放到前面
        this.searchList.unshift({
          value: this.value,
          time: new Date().getTime(),
        });
        // 数据大于等于11，即取10个，将最后一个删除
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.page = 1;
      this.goodsList = [];
      this.$api.search(this.value, this.page, this.size)
        .then((data) => {
          this.length = data.total;
          this.goodsList = [...this.goodsList, ...data.list];
          this.showList = false;
        });
    },
    // 防抖
    // 输入的时候不发送请求，在输入完成后的3毫秒再发送请求
    input() {
      if (this.value === '') {
        this.likeList = [];
        clearTimeout(this.timer);
        this.timer = null;
        return;
      }

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(() => {
          this.$api.likeSearch(this.value).then((data) => {
            this.likeList = data.result;
            clearTimeout(this.timer);
            this.timer = null;
          });
        }, 300);
      }
    },
    focus() {
      this.showList = true;
    },
    formatHtml(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
};
</script>

<style lang="less" scoped>
.search-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-head {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    z-index: 22;
    .arr-left {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
      .shop-car {
        font-size: 15px;
      }
    }
  }
  .like-search {
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 30px;
  }
  .goods-list {
    position: relative;
    width: 345px;
    margin: 48px auto 0;
    z-index: 10;
    background: #fff;
  }
  .my-histroy {
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
