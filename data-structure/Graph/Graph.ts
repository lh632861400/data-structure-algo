/**
 *
 *
 * 邻接矩阵
 * 邻接表
 *
 * 入度
 * 一个顶点进来的边的个数
 *
 * 出度
 * 一个顶点出去的边的个数
 *
 * 无向图
 * 图中的所有边都是没有方向的
 *
 * 有向图
 * 图中所有的边都是有方向的
 *
 * 有环图
 * 存在一个顶点出发，经过路径重新回到该顶点，那么久存在环，定义为有环图
 *
 * 连通图
 * 在无向图中任意两个顶点都能直接或者间接的相连称为连通图
 *
 * 连通分量
 * 在无向图中的极大连通子图
 *
 * 强连通图
 * 在有向图中任意两个顶点都能直接或者间接的相连称为连通图
 *
 * 强联通分量
 * 在有向图中的极大连通子图
 *
 * AOE(activity on network)网
 * 活动网
 * 一些子项目依赖前一个子项目先完成
 * 在有向图存在无环图
 *
 *
 * 拓扑排序(topoLogicSort)
 * 一种数据结构
 * 特性是当前活动节点都排在当前节点的后溪活动之前
 * 算法：kahn 卡恩算法
 * kahn算法基本原理：
 * 每一遍历找出入度为0的顶点，从图中删除，保存进结果，那么相连的顶点的入度减一，直到找不到入度为0的顶点位置，比较结果的顶点个数和总的顶点个数，
 * 如果相等则存在一个拓扑排序否则存在环
 *
 * 生成树(Spanning Tree)(支撑树)
 *
 * 最小生成树(Minimum Spanning Tree)(最小权重生成树)
 * 有权无向图中极小连通子图最小的权重和的生成树(极小指的是最少的边)
 * 特性：如果边的权重都不相等，存在唯一一颗最小生成树否则可能存在多颗最小生成树
 * 算法：Prim cruskal
 * prim算法原理：
 * 切分
 * 把图分为两部分那么定义为一个切分
 * 横切边
 * 切分两部分相连的边定义为横切边
 * 切分定理
 * 切分中的横切边最小的权值的边一定是最小生成树中的边
 * cruskal算法原理：
 * 贪心细想并查集
 *
 *
 * 最短路径算法
 * 单源最短路径
 * dijkstra bellmanFord
 * 多源最短路径
 * floyd
 * 松弛操作
 * 计算从begin顶点到当前边的终点之间的最短路径信息
 *
 * dijkstra算法
 * 不能具有负权边
 *
 * bellmanFord算法
 * 对所有边进行V - 1次松弛操作
 * 能够计算负权边，能够检测出负权环
 *
 * floyd算法
 * 暴力求解，对所有顶点进行穷举 V ^ 3
 * dist(i, j) 是i到j的最短路径
 * 穷举k，计算dist(i, k) + dist(k, j) 最短路径更新最短路径
 *
 *
 *
 * */
import {IEdge, IGraph, IVertex} from "./IGraph";

export default class Graph<V, E> implements IGraph<V, E> {

  verticesMap: Map<V, Vertex<V, E>>;
  edgesSet: Set<Edge<V, E>>;

  constructor() {

    this.verticesMap = new Map();

    this.edgesSet = new Set();

  }

  addEdge(v1: V, v2: V, weight?: E): void {

    let vertex1 = this.verticesMap.get(v1);

    if(!vertex1) {
      vertex1 = new Vertex(v1);
      this.verticesMap.set(v1, vertex1);
    }

    let vertex2 = this.verticesMap.get(v2);

    if(!vertex2) {
      vertex2 = new Vertex(v2);
      this.verticesMap.set(v2, vertex2);
    }

    let edge;

    for(let e of this.edgesSet) {
      if(e.from.value === v1 && e.to.value === v2) {
        edge = e;
      }
    }

    if(!edge) {
      edge = new Edge(vertex1, vertex2, weight);

      this.edgesSet.add(edge);
    }

    vertex1.outEdges.add(edge);

    vertex2.inEdges.add(edge)

  }

}

export class Vertex<V, E> implements IVertex<V, E> {
  inEdges: Set<Edge<V, E>>;
  outEdges: Set<Edge<V, E>>;
  value: V;

  constructor(value?: V) {

    this.value = value;

  }

}

export class Edge<V, E> implements IEdge<V, E> {
  from: Vertex<V, E>;
  to: Vertex<V, E>;
  weight: E;

  constructor(from: Vertex<V, E>, to: Vertex<V, E>, weight?: E) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

}
