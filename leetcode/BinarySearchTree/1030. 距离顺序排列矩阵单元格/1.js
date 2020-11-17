/**
 *
 * thoughts:
 * 采用层序遍历的方法
 * 将[r0, c0]所在坐标作为根节点，距离[r0, c0]曼哈顿距离为1的作为子节点
 * 同样递归子节点
 * O(R^2)
 *
 *
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var allCellsDistOrder = function(R, C, r0, c0) {

  // 记录已经输出的坐标节点
  const resultsMap = {};

  const queue = [];

  queue.push([r0, c0]);

  const results = []

  resultsMap[`${r0} ${c0}`] = true;

  // 当队列中还有数据
  while(queue.length) {

    const node = queue.shift();
    const r = node[0];
    const c = node[1];

    results.push(node);

    // [r, c]坐标为r >= 0 && r < R && c >= 0 && c < C的合法坐标放入到队列中周围的数据放入到队列
    if(r - 1 >= 0) {

      if(!resultsMap[`${r - 1} ${c}`]) { // 判断节点左边数据是否合法并且未输出
        queue.push([r - 1, c])
        resultsMap[`${r - 1} ${c}`] = true;
      }
    }

    if(r + 1 < R) {
      if(!resultsMap[`${r + 1} ${c}`]) { // 判断节点右边数据是否合法并且未输出
        queue.push([r + 1, c])
        resultsMap[`${r + 1} ${c}`] = true;
      }
    }

    if(c - 1 >= 0) {
      if(!resultsMap[`${r} ${c - 1}`]) { // 判断节点左边数据是否合法并且未输出
        queue.push([r, c - 1])
        resultsMap[`${r} ${c - 1}`] = true;
      }
    }

    if(c + 1 < C) {
      if(!resultsMap[`${r} ${c + 1}`]) { // 判断节点左边数据是否合法并且未输出
        queue.push([r, c + 1])
        resultsMap[`${r} ${c + 1}`] = true;
      }
    }
  }

  return results;

};

console.log(allCellsDistOrder(2, 3, 1, 2))
