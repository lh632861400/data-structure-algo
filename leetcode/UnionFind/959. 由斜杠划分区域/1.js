/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/regions-cut-by-slashes/solution/you-xie-gang-hua-fen-qu-yu-by-leetcode-67xb/
 *
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function(grid) {

  if(!grid.length) {
    return 0;
  }

  const N = grid[0].length;

  const uf = new UnionFind(4 * N * N);

  let arr = [];
  let index = 0;
  for(let i = 0; i < N; i++) {

    arr = grid[i].split("");

    for(let j = 0; j < N; j++) {

      index = 4 * (i * N + j);

      if(arr[j] === '/') {
        uf.union(index, index + 3);
        uf.union(index + 1, index + 2);
      }else if(arr[j] === '\\') {
        uf.union(index, index + 1);
        uf.union(index + 2, index + 3);
      }else {
        uf.union(index, index + 1);
        uf.union(index + 1, index + 2);
        uf.union(index + 2, index + 3);
      }

      if(j + 1 < N) {
        uf.union(index + 1, 4 * (i * N + j + 1) + 3);
      }

      if(i + 1 < N) {
        uf.union(index + 2, 4 * ((i + 1) * N + j));
      }

    }

  }

  return uf.size;

};

class UnionFind {

  parents;
  size;
  rank;

  constructor(count) {

    this.size = count;

    this.parents = new Array(count);

    this.rank = new Array(count);

    for(let i = 0; i < count; i++) {

      this.parents[i] = i;

      this.rank[i] = 1;

    }

  }

  find(v) {

    let p = v;

    while(v !== this.parents[v]) {

      p = this.parents[v];

      this.parents[v] = this.parents[p];

      v = p;

    }

    return this.parents[v];

  }

  union(v1, v2) {

    const p1 = this.find(v1);
    const p2 = this.find(v2);

    if(p1 === p2) {
      return;
    }

    if(this.rank[p1] < this.rank[p2]) {
      this.parents[p1] = p2;
    }else if(this.rank[p2] < this.rank[p1]) {
      this.parents[p2] = p1;
    }else {
      this.parents[p1] = p2;
      this.rank[p2]++;
    }

    this.size--;

  }

}
