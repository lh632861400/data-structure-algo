/**
 *
 * thoughts:
 *
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function(points) {

  if(!points.length) {
    return 0;
  }
  const len = points.length;

  points.sort((a, b) => {
    return a[1] - b[1]
  });

  // 记录最右边的位置
  let pos = points[0][1];
  let ans = 1;
  for(let i = 1; i < len; i++) {

    // 如果气球的最左边小于上一个边界位置，则需要的射箭次数 ans++
    if(points[i][0] > pos) {
      ans++;
      pos = points[i][1];
    }

  }

  return ans++;

};
