/**
 *
 * thoughts:
 * 图的遍历，邻接表
 *
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {

  const visited = new Set();

  const map = new Map();

  const n = tickets.length;

  // 邻接表表示有向图
  for(let i = 0; i < n; i++) {

    const [from, to] = tickets[i];

    const target = map.get(from) || [];
    target.push(to);
    map.set(from, target);

  }

  const result = [];

  findItineraryHelper(n, result, ['JFK'], visited, map, 'JFK');

  if(result.length > 1) {
    result.sort((a, b) => {
      for (let i = 1; i < a.length; i++) {
        if(a[i] === b[i]) {
          continue;
        }else {
          return compare(a[i], b[i]);
        }
      }
    })
  }

  return result[0]

};

function findItineraryHelper(n, results, validResult, visited, map, from) {

  // 如果当前节点所有的有向线等于所有线，则是一种有效解
  if(visited.size === n) {

    const str = validResult.join(",");
    const arr = str ? str.split(",") : null;

    if(arr) {
      results.push(arr)
    }
    return;
  }

  const target = map.get(from);

  if(target && target.length) {

    for(let i = 0; i < target.length; i++) {

      // 如果没有被访问过
      if(!visited.has(`${from}_${target[i]}`)) {

        visited.add(`${from}_${target[i]}`);

        validResult.push(target[i]);

        findItineraryHelper(n, results, validResult, visited, map, target[i])

        visited.delete(`${from}_${target[i]}`);

        validResult.pop();
      }

    }

  }

}

function compare(a, b) {

  for(let i = 0; i < a.length; i++) {
    if(a.charCodeAt(i) < b.charCodeAt(i)) {
      return -1;
    }else if(a.charCodeAt(i) > b.charCodeAt(i)) {
      return 1;
    }else {
      continue
    }
  }

  return 0;

}
