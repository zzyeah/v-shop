// 运动函数
/**
 * 使用该函数实现导航栏运动效果
 * @param {*} start 开始距离
 * @param {*} end 最终距离
 * @param {*} dom dom元素
 * @param {*} prop 属性
 */
function moveTo(start, end, dom, prop) {
  let dis = 0;
  let speed = 5;
  if (end < 0) {
    speed *= -1;
  }
  const t = setInterval(() => {
    dis += speed;
    dom[prop] = start + dis;
    // 运动距离比最终值大

    if (Math.abs(dis) >= Math.abs(end)) {
      dom[prop] = start + end;
      clearInterval(t);
    }
  }, 2);
}

export default { moveTo };
