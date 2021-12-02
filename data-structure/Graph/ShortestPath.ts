/**
 *
 *
 * 最短路径
 * 在无向图，有向图，无权图，有权图，存在负权边，都存在最短路径，但是不能出现负权环
 *
 * 负权边
 * 边的权值是负数
 *
 * 负权环
 * 图中存在环边的权值为负数
 *
 * 单源最短路径
 * 从一个顶点出发到其他点计算出所有最短路径
 *
 * Dijkstra
 * BellmanFord
 *
 * 多源最短路径
 * 从图中任意一个点出发计算出到其他点的最短路径
 * floyd
 *
 * */

/**
 *
 *
 * @param {Array} graph [start, end, weight]
 *
 * */
function shortestPath(graph: [number, number, number][], begin: number) {

}

function dijkstra(graph: number[][], begin: number, n: number) {

  const selectedVertex = new Map<number, number>();

  // key为终点vertice
  // value为权值
  const paths = new Map<number, number>();

  for(let i = 0; i < n; i++) {

    if(graph[begin][i] !== Infinity) {
      // 选择出直接相连的顶点
      paths.set(i, graph[begin][i])
    }
  }

  while(paths.size) {

    // 从中挑出最小的权值
    let minVertice = null;
    let minWeight = null;
    paths.forEach((vertice, weight) => {

      if (minWeight === null || weight < minWeight) {
        minVertice = vertice;
        minWeight = weight;
      }

    })

    selectedVertex.set(minVertice, minWeight)

    // 进行松弛操作
    for (let i = 0; i < n; i++) {

      if (graph[minVertice][i] !== Infinity) {
        if (graph[minVertice][i] + minWeight < graph[begin][i]) {
          paths.set(i, graph[minVertice][i] + minWeight)
        }
      }
    }

  }

  return selectedVertex

}

const graph = [
  [1, 2, 6],
  [1, 4, 5],
  [1, 3, 1],
  [2, 3, 5],
  [2, 5, 3],
  [3, 4, 5],
  [3, 6, 4],
  [5, 6, 6],
  [4, 6, 2],
]

