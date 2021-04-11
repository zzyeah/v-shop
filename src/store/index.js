import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideList: [],
    showContent: false,
    size: 50,
    goodsList: [],
    type: null,
    counterMap: {},
    purchaseMap: {},
    buytoomuch: false,
  },
  mutations: {
    storageChange(state, { id, value, inventory }) {
      state.buytoomuch = false;
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          console.log(state.counterMap);
          Vue.delete(state.counterMap, id);
        } else if (state.counterMap[id] >= inventory) {
          Vue.set(state.counterMap, id, inventory);
          state.buytoomuch = true;
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
    },
    purStorageChange(state, { id, value }) {
      const res = state.purchaseMap[id];
      if (res) {
        Vue.set(state.purchaseMap, id, res + value);
      } else {
        Vue.set(state.purchaseMap, id, value);
      }
      localStorage.setItem('purchases', JSON.stringify(state.purchaseMap));
    },
    setCounterMap(state, map) {
      state.counterMap = map;
    },
    setSideList(state, list) {
      state.sideList = list;
    },
    setShowContent(state, bool) {
      // 加载页面时需要重置样式
      state.showContent = bool;
    },
    setGoodsList(state, list) {
      state.goodsList = [...state.goodsList, ...list];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setGoodsType(state, type) {
      state.type = type;
    },
    setPurchaseMap(state, pm) {
      state.purchaseMap = pm;
    },
  },
  actions: {
    // 获取菜单列表
    async getSideList({ commit, dispatch }, type) {
      // commit('setShowContent', false);
      return api.getSideList(type).then((data) => {
        commit('setSideList', data);
        commit('setShowContent', true);
        dispatch('getGoodsList', { type: data[0], page: 1 });
      });
    },
    // 获取商品列表
    async getGoodsList({ state, commit }, options) {
      const { page, sortType } = options;
      const type = options.type || state.type;
      return api.getGoodsList(type, page, state.size, sortType)
        .then((data) => {
          commit('setGoodsList', data.list);
          commit('setGoodsType', type);
        });
    },
  },
  modules: {
  },
});
