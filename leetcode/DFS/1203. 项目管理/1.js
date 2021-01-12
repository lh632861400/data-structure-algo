/**
 * @param {number} n
 * @param {number} m
 * @param {number[]} group
 * @param {number[][]} beforeItems
 * @return {number[]}
 */
var sortItems = function(n, m, group, beforeItems) {

  // 每一个组的项目列表
  const groupItem = new Array(m + n).fill(0).map(() => []);

  const groupDegree = new Array(m + n).fill(0);
  const groupGraph = new Array(m + n).fill(0).map(() => []);

  const itemDregree  = new Array(n).fill(0);
  const itemGraph = new Array(n).fill(0).map(() => []);

  // 组的列表
  const id = new Array(m + n).fill(0).map((value, i) => i)

  // 初始化以来关系
  let left = m;
  for(let i = 0; i < group.length; i++) {
    if(group[i] === -1) {
      group[i] = left;
      left++
    }

    groupItem[group[i]].push(i)
  }

  // 构建依赖关系
  for(let i = 0; i < n; i++) {
    const curGroupId = group[i];

    for(let item of beforeItems[i]) {

      // 如果前置依赖的项目所在的组和当前项目所在的组在同一个组
      if(group[item] === curGroupId) {
        itemDregree[i] += 1;
        itemGraph[item].push(i);
      }else {
        groupDegree[curGroupId] += 1;
        groupGraph[group[item]].push(curGroupId);
      }

    }
  }

  // 拓扑排序
  const res = topSort(groupDegree, groupGraph, id);

  if(res.length === 0) {
    return [];
  }

  const result = [];
  for(let group of res) {

    if(groupItem[group].length) {

      const items = topSort(itemDregree, itemGraph, groupItem[group]);

      if (items.length) {
        result.push(...items)
      } else {
        return [];
      }

    }

  }

  return result;

};

function topSort(deg, graph, items) {

  const queue = [];

  for(let node of items) {
    if(deg[node] === 0) {
      queue.push(node)
    }
  }

  const res = [];
  while(queue.length) {

    const u = queue.shift();

    res.push(u);

    for(let v of graph[u]) {
      if(--deg[v] === 0) {
        queue.push(v)
      }
    }

  }

  return res.length === items.length ? res : [];

}
