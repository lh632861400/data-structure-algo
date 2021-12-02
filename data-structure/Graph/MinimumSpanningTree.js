/**
 *
 *
 * graph 图
 * v 顶点
 *
 * prim
 *
 * cruskal
 *
 * 判断是否是连通图
 *
 * */

var UnionFind_QU_R_PH = /** @class */ (function () {
  function UnionFind_QU_R_PH(capacity) {
    this.parents = new Array(capacity).fill(0);
    for (var i = 0; i < this.parents.length; i++) {
      this.parents[i] = i;
    }
    var rank = new Array(capacity);
    for (var i = 0; i < rank.length; i++) {
      rank[i] = 1;
    }
    this.rank = rank;
  }
  UnionFind_QU_R_PH.prototype.isSame = function (v1, v2) {
    return this.find(v1) === this.find(v2);
  };
  UnionFind_QU_R_PH.prototype.check = function (v) {
    if (v < 0 || v >= this.parents.length) {
      throw new Error('v is out of range');
    }
  };
  UnionFind_QU_R_PH.prototype.find = function (v) {
    this.check(v);
    // 如果v !== parents[v]，则继续需要向parent遍历
    while (v !== this.parents[v]) {
      var p = this.parents[v];
      this.parents[v] = this.parents[this.parents[v]];
      v = this.parents[v];
    }
    return this.parents[v];
  };
  UnionFind_QU_R_PH.prototype.union = function (v1, v2) {
    this.check(v1);
    this.check(v2);
    if (v1 === v2)
      return;
    var p1 = this.find(v1);
    var p2 = this.find(v2);
    if (this.rank[p1] < this.rank[p2]) {
      this.parents[p1] = p2;
    }
    else if (this.rank[p1] > this.rank[p2]) {
      this.parents[p2] = p1;
    }
    else {
      this.parents[p1] = p2;
      this.rank[p2]++;
    }
  };
  return UnionFind_QU_R_PH;
}());

var MAX_VERTEX_COUNT = 100;
var MAX_COST = Infinity;
function miminumSpanningTree(graph, v) {
    var graphMatrix = new Array(MAX_VERTEX_COUNT).fill(0);
    for (var i = 0; i < graphMatrix.length; i++) {
        graphMatrix[i] = new Array(MAX_VERTEX_COUNT).fill(MAX_COST);
    }
    for (var i = 0; i < graph.length; i++) {
        var _a = graph[i], start = _a[0], end = _a[1], cost = _a[2];
        graphMatrix[start][end] = cost;
        graphMatrix[end][start] = cost;
    }
    // const [sum, str] = prim(graphMatrix, v)
    var _b = cruskal(graph, 6), sum = _b[0], str = _b[1];
    console.log(sum, str);
}
function prim(graph, v) {
    // lowestCost[i] 代表i为终点的最小的权值
    var lowestCost = new Array(MAX_VERTEX_COUNT).fill(MAX_COST);
    // mst[i]代表的是lowestCost[i]的起点的编号
    var mst = new Array(MAX_VERTEX_COUNT).fill(1);
    for (var i = 1; i <= v; i++) {
        lowestCost[i] = graph[1][i];
        mst[i] = 1;
    }
    mst[1] = 0;
    var sum = 0;
    var str = '';
    for (var i = 2; i <= v; i++) {
        var min = MAX_COST;
        var minIdx = 0;
        // 遍历出最小的权值
        for (var j = 2; j <= v; j++) {
            if (lowestCost[j] < min && lowestCost[j] !== 0) {
                min = lowestCost[j];
                minIdx = j;
            }
        }
        sum += min;
        str += "," + mst[minIdx] + " -> " + minIdx;
        // 等于0代表已经加入mst
        lowestCost[minIdx] = 0;
        // 更新每一个顶点作为终点距离切分的一部分的最小权值
        for (var j = 2; j <= v; j++) {
            if (graph[minIdx][j] < lowestCost[j]) {
                lowestCost[j] = graph[minIdx][j];
                mst[j] = minIdx;
            }
        }
    }
    return [sum, str.substring(1)];
}
function cruskal(graph, v) {
    var uf = new UnionFind_QU_R_PH(MAX_VERTEX_COUNT);
    var edges = 0;
    var sum = 0;
    var str = '';
    // 对权值进行排序
    graph.sort(function (a, b) {
        return a[2] - b[2];
    });
    for (var i = 0; i < graph.length; i++) {
        // 判断边的顶点是否都属于用一个集合
        if (uf.find(graph[i][0]) !== uf.find(graph[i][1])) {
            str += " " + graph[i][0] + " -> " + graph[i][1];
            sum += graph[i][2];
            edges++;
            uf.union(graph[i][0], graph[i][1]);
        }
    }
    // 不是连通图
    if (edges < v - 1) {
        sum = -1;
    }
    return [sum, str];
}
miminumSpanningTree([
    [1, 2, 6],
    [1, 4, 5],
    [1, 3, 1],
    [2, 3, 5],
    [2, 5, 3],
    [3, 4, 5],
    [3, 6, 4],
    [5, 6, 6],
    [4, 6, 2],
], 6);
