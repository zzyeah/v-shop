import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
    showContent: false,
    size: 20,
    goodsList: [],
    type: null,
    counterMap: {},
  },
  mutations: {
    storageChange(state, { id, value }) {
      if (state.counterMap[id]) {
        if ((value === -1 && state.counterMap[id] === 1) || value === -Infinity) {
          Vue.delete(state.counterMap, id);
        } else {
          Vue.set(state.counterMap, id, state.counterMap[id] + value);
        }
      } else {
        Vue.set(state.counterMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.counterMap));
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
  },
  actions: {
    // 获取菜单列表
    async getSideList({ commit, dispatch }, type) {
      // commit('setShowContent', false);
      return api.getSideList(type).then((data) => {
        console.log(data);
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
          console.log(type);
        });
    },
  },
  modules: {
  },
});
