/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
var findCriticalAndPseudoCriticalEdges = function(n, edges) {

  const m = edges.length;

  const newEdges = new Array(m);

  for(let i = 0; i < m; i++) {

    newEdges[i] = new Array(4);

    for(let j = 0; j < 3; j++) {
      newEdges[i][j] = edges[i][j];
    }

    newEdges[i][3] = i;

  }

  newEdges.sort((a, b) => {
    return a[2] - b[2]
  })

  // 计算最小生成树的权值
  let value = 0;

  const uf = new UnionFind(n);

  for(let i = 0; i < m; i++) {

    if(uf.union(newEdges[i][0], newEdges[i][1])) {
      value += newEdges[i][2]
    }

  }

  const result = new Array(2);
  result[0] = [];
  result[1] = [];
  for(let i = 0; i < m; i++) {

    let uf = new UnionFind(n);
    let v = 0;

    for(let j = 0; j < m; j++) {

      if(i !== j && uf.union(newEdges[j][0], newEdges[j][1])) {
        v = v + newEdges[j][2]
      }

    }

    if(uf.size !== 1 || (uf.size === 1 && v > value)) {
      result[0].push(newEdges[i][3]);
      continue;
    }

    uf = new UnionFind(n);
    uf.union(newEdges[i][0], newEdges[i][1])
    v = newEdges[i][2];

    for(let j = 0; j < m; j++) {

      if(i !== j && uf.union(newEdges[j][0], newEdges[j][1])) {
        v = v + newEdges[j][2]
      }

    }

    if(v === value) {
      result[1].push(newEdges[i][3])
    }

  }

  return result;

};

class UnionFind {

  size;
  parents;
  rank;

  constructor(count) {

    this.parents = new Array(count);

    this.rank = new Array(count);

    for(let i = 0; i < count; i++) {

      this.parents[i] = i;

      this.rank[i] = 1;

    }

    this.size = count;

  }

  find(v) {

    while(v !== this.parents[v]) {

      const p = this.parents[v];

      this.parents[v] = this.parents[p];

      v = p;

    }

    return this.parents[v];

  }

  union(v1, v2) {

    const p1 = this.find(v1);
    const p2 = this.find(v2);

    if(p1 === p2) {
      return false;
    }

    if(this.rank[p1] < this.rank[p2]) {
      this.parents[p1] = p2;
    }else if(this.rank[p1] > this.rank[p2]) {
      this.parents[p2] = p1;
    }else {
      this.parents[p1] = p2;
      this.rank[p2]++;
    }

    this.size--;

    return true;

  }

}
