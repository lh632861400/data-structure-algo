/**
 *
 *
 * graph 图
 * v 顶点
 *
 * */


const MAX_VERTEX_COUNT = 100;

const MAX_COST = Infinity;
function miminumSpanningTree(graph: [number, number, number][], v: number) {

  const graphMatrix = new Array(MAX_VERTEX_COUNT).fill(0);

  for(let i = 0; i < graphMatrix.length; i++) {
    graphMatrix[i] = new Array(MAX_VERTEX_COUNT).fill(MAX_COST);
  }

  for(let i = 0; i < graph.length; i++) {
    const [start, end, cost] = graph[i];

    graphMatrix[start][end] = cost;
    graphMatrix[end][start] = cost;

  }

  // const [sum, str] = prim(graphMatrix, v)

  const [sum, str] = cruskal(graph, 6);

  console.log(sum, str)

}

function prim(graph: number[][], v: number) {

  // lowestCost[i] 代表i为终点的最小的权值
  const lowestCost = new Array(MAX_VERTEX_COUNT).fill(MAX_COST);

  // mst[i]代表的是lowestCost[i]的起点的编号
  const mst = new Array(MAX_VERTEX_COUNT).fill(1)

  for(let i = 1; i <= v; i++) {
    lowestCost[i] = graph[1][i];
    mst[i] = 1;
  }

  mst[1] = 0;

  let sum = 0;

  let str = '';

  for(let i = 2; i <= v; i++) {

    let min = MAX_COST;

    let minIdx = 0;

    // 遍历出最小的权值
    for(let j = 2; j <= v; j++) {

      if(lowestCost[j] < min && lowestCost[j] !== 0) {
        min = lowestCost[j];
        minIdx = j;
      }

    }

    sum += min;
    str += `,${mst[minIdx]} -> ${minIdx}`;

    // 等于0代表已经加入mst
    lowestCost[minIdx] = 0;


    // 更新每一个顶点作为终点距离切分的一部分的最小权值

    for(let j = 2; j <= v; j++) {

      if(graph[minIdx][j] < lowestCost[j]) {
        lowestCost[j] = graph[minIdx][j];
        mst[j] = minIdx;
      }

    }


  }

  return [sum, str.substring(1)]

}

function cruskal(graph: [number, number, number][], v: number) {

  const uf = new UnionFind_QU_R_PH(MAX_VERTEX_COUNT);

  let edges = 0;

  let sum = 0;

  let str = '';

  // 对权值进行排序
  graph.sort((a, b) => {
    return a[2] - b[2];
  });

  for(let i = 0; i < graph.length; i++) {

    // 判断边的顶点是否都属于用一个集合
    if(uf.find(graph[i][0]) !== uf.find(graph[i][1])) {
      str += ` ${graph[i][0]} -> ${graph[i][1]}`
      sum += graph[i][2];
      edges++;
      uf.union(graph[i][0], graph[i][1]);
    }

  }

  // 不是连通图
  if(edges < v - 1) {
    sum = -1;
  }

  return [sum, str]

}

miminumSpanningTree(
  [
    [1, 2, 6],
    [1, 4, 5],
    [1, 3, 1],
    [2, 3, 5],
    [2, 5, 3],
    [3, 4, 5],
    [3, 6, 4],
    [5, 6, 6],
    [4, 6, 2],
  ],
  6
)

class UnionFind_QU_R_PH {
  parents: number[]
  rank: number[];

  constructor(capacity: number) {

    this.parents = new Array(capacity).fill(0);

    for(let i = 0; i < this.parents.length; i++) {
      this.parents[i] = i;
    }

    const rank = new Array(capacity);

    for (let i = 0; i < rank.length; i++) {
      rank[i] = 1;
    }

    this.rank = rank;

  }

  isSame(v1: number, v2: number) {
    return this.find(v1) === this.find(v2);
  }

  protected check(v: number) {
    if(v < 0 || v >= this.parents.length) {
      throw new Error('v is out of range')
    }
  }

  find(v: number): number {
    this.check(v);

    // 如果v !== parents[v]，则继续需要向parent遍历
    while(v !== this.parents[v]) {

      const p = this.parents[v];
      this.parents[v] = this.parents[this.parents[v]]

      v = this.parents[v]

    }

    return this.parents[v]
  }

  union(v1: number, v2: number): void {

    this.check(v1);
    this.check(v2);

    if(v1 === v2) return;

    const p1 = this.find(v1);
    const p2 = this.find(v2);

    if(this.rank[p1] < this.rank[p2]) {
      this.parents[p1] = p2;
    }else if(this.rank[p1] > this.rank[p2]) {
      this.parents[p2] = p1;
    }else {
      this.parents[p1] = p2;
      this.rank[p2]++;
    }

  }

}
