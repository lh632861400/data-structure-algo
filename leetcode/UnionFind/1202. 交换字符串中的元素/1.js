/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function(s, pairs) {

  const uf = new UnionFind(s.length);

  const map = new Map();

  const set = new Set();

  for(let i = 0; i < pairs.length; i++) {

    const [i1, i2] = pairs[i];

    uf.union(i1, i2);

  }

  for(let i = 0; i < s.length; i++) {

    const root = uf.find(i);

    if(map.has(root)) {
      const arr = map.get(root);
      arr.push(s[i])
    }else {
      const arr = [];
      arr.push(s[i])

      map.set(root, arr);
    }

  }

  for(let i = 0; i < s.length; i++) {

    const root = uf.find(i)

    if(!set.has(root)) {
      const arr = map.get(root);

      arr.sort((a, b) => {
        return a.charCodeAt(0) - b.charCodeAt(0)
      })

      set.add(root)
    }

  }

  let str = '';
  for(let i = 0; i < s.length; i++) {
    const arr = map.get(uf.find(i));

    str += arr.shift();
  }

  return str;

};

function UnionFind(count) {

  this.elements = new Array(count);

  this.rank = new Array(count)

  for(let i = 0; i < this.elements.length; i++) {

    this.elements[i] = i;

    this.rank[i] = 1;

  }

}

UnionFind.prototype = {

  find(v) {

    // 如果v !== parents[v]，则继续需要向parent遍历
    while(v !== this.elements[v]) {

      const p = this.elements[v];
      this.elements[v] = this.elements[this.elements[v]]

      v = p;

    }

    return this.elements[v]

  },

  union(i1, i2) {

    const p1 = this.find(i1);

    const p2 = this.find(i2);

    if(p1 === p2) {
      return;
    }

    if(this.rank[p1] < this.rank[p2]) {
      this.elements[p1] = p2;
    }else if(this.rank[p1] > this.rank[p2]) {
      this.elements[p2] = p1;
    }else {
      this.elements[p1] = p2;
      this.rank[p2]++;
    }

  }

};

