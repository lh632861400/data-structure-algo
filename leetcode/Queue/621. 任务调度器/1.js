/**
 *
 * thoughts:
 * 贪心算法
 *
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function(tasks, n) {

  const map = new Map();
  tasks.forEach((task) => {
    const count = map.get(task) ? map.get(task) + 1 : 1;
    map.set(task, count)
  })

  const counts= map.values();

  const countsTask = Array.from(counts).sort((a, b) => {
    return b - a;
  })
  // 采用官方的第三种算法

  // 和最大值一样的task的个数的索引
  const maxIndex = countsTask.lastIndexOf(countsTask[0]);

  return Math.max((countsTask[0] - 1) * (n + 1) + maxIndex + 1, tasks.length)

};
