import Axios from 'axios';
import baseURL, { URLS } from './URLS';

const appkey = 'chanziya_1615727120257';

const request = Axios.create({
  baseURL,
  params: {
    appkey,
  },
});
// 拦截器（ 将传入的信息拦截并提取需要的数据 ）
request.interceptors.response.use((value) => value.data);

const getSideList = (type) => request.get(
  URLS.getSide,
  { params: { type } },
);

const getGoodsList = (type, page, size, sort) => request.get(
  URLS.getGoodsList,
  {
    params: {
      type, size, sort, page,
    },
  },
);

const likeSearch = (value) => request.get(
  URLS.likeSearch,
  {
    params: {
      likeValue: value,
    },
  },
);

const search = (type, page, size) => request.get(
  URLS.search,
  {
    params: {
      type, page, size,
    },
  },
);

const getGoodsByIds = (value) => request.get(
  URLS.getGoodsByIds,
  {
    params: {
      value,
    },
  },
);

export default {
  getSideList,
  getGoodsList,
  likeSearch,
  search,
  getGoodsByIds,
};
