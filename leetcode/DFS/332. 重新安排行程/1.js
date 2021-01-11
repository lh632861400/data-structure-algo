/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {

  const map = new Map();

  const arr = [];

  for(let [src, dst] of tickets) {

    if(map.has(src)) {

      const arr = map.get(src);

      arr.push(dst);

    }else {
      const arr = [dst];

      map.set(src, arr);
    }

  }

  map.forEach((dst, src) => {
    dst.sort()
  })

  dfs('JFK');

  function dfs(temp) {

    const dst = map.get(temp)

    while(dst && dst.length) {

      dfs(dst.shift())

    }

    arr.push(temp)

  }

  arr.reverse();

  return arr;

};
