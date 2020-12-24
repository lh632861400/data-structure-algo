/**
 *
 * thoughts:
 * 两次遍历
 *
 * 1 2 3 4 5
 * i = 2
 * > i - 1 <i + 1
 * dp[i - 1] + 1
 *
 * 5 4 3 2 1
 * i = 2
 *
 * < i - 1 > i + 1
 * dp[i + 1] + 1
 *
 * 3 4 5 2 1
 * i = 2
 *
 * > i + 1  > i - 1
 * max(i + 1, i - 1) + 1
 *
 * min(i + 1, i - 1) + 1
 *
 * O(n)
 * O(n)
 *
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function(ratings) {

  let res = new Array(ratings.length);
  for(let i = 0; i < ratings.length; i++) {

    if(i > 0 && ratings[i] > ratings[i - 1]) {
      res[i] = res[i - 1] + 1;
    }else {
      res[i] = 1;
    }

  }

  let ret = 0;
  let right = 1;
  for(let i = ratings.length - 1; i >= 0; i--) {

    if(i < ratings.length - 1 && ratings[i] > ratings[i + 1]) {

      right++;

    }else {
      right = 1;
    }

    ret += Math.max(res[i], right);

  }

  return ret;


};
