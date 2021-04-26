/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function(weights, D) {

  let left = 0;

  for(let i = 0; i < weights.length; i++) {

    left = Math.max(left, weights[i])

  }

  let right = weights.reduce((sum, weight) => sum + weight, 0)


  let mid = left;
  while(left < right) {
    mid = (left + right) >> 1;

    let next = 1;
    let cur= 0;
    for(let weight of weights) {
      if(cur + weight > mid) {
        next++;
        cur = weight;
      }else {

        cur += weight;

      }
    }

    if(next > D) {
      left = mid + 1;
    }else {
      right = mid;
    }
  }

  return right;

};
