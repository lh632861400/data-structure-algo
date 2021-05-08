/**
 *
 *
 * thoughts:
 * https://leetcode-cn.com/problems/find-minimum-time-to-finish-all-jobs/solution/wan-cheng-suo-you-gong-zuo-de-zui-duan-s-hrhu/
 *
 * @param {number[]} jobs
 * @param {number} k
 * @return {number}
 */
var minimumTimeRequired = function(jobs, k) {

  jobs.sort((a, b) => {
    return b - a;
  })

  let l = jobs[0];

  let r = jobs.reduce((a, b) => a + b, 0)

  while(l < r) {

    const mid = l + ((r - l) >> 1);

    if(check(jobs, k, mid)) {
      r = mid;
    }else {
      l = l + 1;
    }

  }

  return l;

};

function check(jobs, k , limit) {
  const arr = new Array(k).fill(0)

  return backtrace(jobs, arr, 0, limit)
}

function backtrace(jobs, arr, i, limit) {

  if(i >= jobs.length) {
    return true;
  }


  let cur = jobs[i]
  for(let j = 0; j < arr.length; j++) {

    if(arr[j] + cur <= limit) {

      arr[j] += cur;

      if(backtrace(jobs, arr, i + 1, limit)) {
        return true;
      }

      arr[j] -= cur

    }

    // 判断是否需要继续遍历
    if(arr[j] === 0 || arr[j] + cur === limit) {
      break;
    }

  }

  return false;

}
