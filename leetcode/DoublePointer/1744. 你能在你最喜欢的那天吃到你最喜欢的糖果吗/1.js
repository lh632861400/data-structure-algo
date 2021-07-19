/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/can-you-eat-your-favorite-candy-on-your-favorite-day/solution/ni-neng-zai-ni-zui-xi-huan-de-na-tian-ch-boa0/
 *
 *
 *
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function(candiesCount, queries) {

  const len = candiesCount.length

  const arr = new Array(len).fill(0);

  arr[0] = candiesCount[0];

  const ans = new Array(queries.length).fill(0);

  for(let i = 1; i < len; i++) {
    arr[i] = arr[i - 1] + candiesCount[i]
  }

  for(let i = 0; i < queries.length; i++) {

    const [t, d, c] = queries[i];

    const x1 = d + 1;

    const y1 = (d + 1) * c;

    const x2 = t === 0 ? 1 : arr[t - 1] + 1;

    const y2 = arr[t];

    ans[i] = !(x1 > y2 || x2 > y1);

  }

  return ans;

};
