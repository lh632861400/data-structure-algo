/**
 *
 * thoughts:
 * 5能够解决10 20，如果20进来先把10支付，在支付5，因为一张10可以用两张5替代
 *
 * 暴力求解每一个子问题
 *
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {

  const map = new Map();
  map.set(5, 0);
  map.set(10, 0);
  map.set(20, 0);

  const len = bills.length;

  for(let i = 0; i < len; i++) {

    // 如果能找零
    if(pay(map, bills[i])) {

    }else {
      return false;
    }

  }

  /**
   *
   * @return true代表支付成功
   *
   * */
  function pay(map, currentPrice) {

    if(currentPrice === 5) {
      map.set(currentPrice, map.get(5) + 1);
    }else if(currentPrice === 10){
      if(map.get(5) === 0) { // 不存在5
        return false;
      }

      map.set(10, map.get(10) + 1)
      map.set(5, map.get(5) - 1)
    }else if(currentPrice === 20) {

      // 如果存在10
      if(map.get(10) > 0 && map.get(5) > 0) {
        map.set(10, map.get(10) - 1);
        map.set(5, map.get(5) - 1)
      }else {
        if(map.get(5) === 0) {
          return false;
        }else if(map.get(10) === 0 && map.get(5) < 3) {
          return false;
        }else {
          map.set(5, map.get(5) - 3)
        }
      }

    }

    return true;

  }

  return true;

};
