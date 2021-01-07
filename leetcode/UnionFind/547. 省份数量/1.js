/**
 *
 * thoughts:
 * UnionFind
 *
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function(isConnected) {

  const n = isConnected.length;

  const uf = new UnionFind(n);

  for(let i = 0; i < n; i++) {
    for(let j = 0; j < n; j++) {

      if(isConnected[i][j] === 1) {

        uf.union(i, j)

      }
    }
  }

  const set = new Set();
  for(let i = 0; i < n; i++) {
    if(set.has(uf.parents[i])) {
      continue;
    }
    set.add(uf.parents[i]);
  }

  return set.size;

};

function UnionFind(count) {

  this.parents = new Array(count)

  for(let i = 0; i < this.parents.length; i++) {
    this.parents[i] = i;
  }
}



UnionFind.prototype = {

  union(v1, v2) {

    if(v1 === v2) {
      return;
    }

    const p1 = this.find(v1);

    // 如果union之后根节点已经不是指向自身，则是已经指向了别的根节点
    if(this.parents[v2] !== v2) {
      v2 = this.parents[v2];
    }

    for(let i = 0; i < this.parents.length; i++) {
      if(this.parents[i] === p1) {
        this.parents[i] = v2;
      }
    }

  },

  find(v1) {

    return this.parents[v1]

  }

};
