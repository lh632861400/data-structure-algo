/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {

  // 获取节点最大值

  const uf = new UnionFind(edges.length + 1);

  for(let i = 0; i < edges.length; i++) {

    const [u, v] = edges[i];

    // 如果遍历之前两个节点已经在同一个连通分量
    if(uf.find(u) === uf.find(v)) {
      return [u, v];
    }else {
      uf.union(u, v)
    }

  }

};

function UnionFind(count) {

  this.parents = new Array(count);

  this.rank = new Array(count);

  for(let i = 0; i < this.parents.length; i++) {
    this.parents[i] = i;

    this.rank[i] = 1;
  }

}

UnionFind.prototype = {

  find(v) {

    while(v !== this.parents[v]) {

      const p = this.parents[v];

      this.parents[v] = this.parents[p];

      v = p;

    }

    return this.parents[v];

  },

  union(v1, v2) {

    const p1 = this.find(v1);
    const p2 = this.find(v2);

    if(p1 === p2) {
      return;
    }

    if(this.rank[p1] < this.rank[p2]) {
      this.parents[p1] = p2;
    }else if(this.rank[p1] > this.rank[p2]) {
      this.parents[p2] = p1;
    }else {
      this.parents[p1] = p2;
      this.rank[p2]++;
    }

  }

};
