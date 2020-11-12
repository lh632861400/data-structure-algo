/**
 *
 * thought:
 * 暴力搜索
 * 数组
 *
 * @param {number} t
 * @return {number}
 */

var RecentCounter = function() {
  this.pings = new Array(10000)
};

/**
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
  this.pings[t] = 1;

  // 遍历 t - 3000 - t范围内的为1的元素个数
  let start = t - 3000;
  if(start < 0) {
    start = 0;
  }
  let count = 0;
  for(let i = start; i <= t; i++) {
    if(this.pings[i]) {
      count++
    }
  }

  return count;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
