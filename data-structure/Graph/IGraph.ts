
export interface IGraph<V, E> {

  addEdge(v1: V, v2: V): void

}

export interface IVertex<V, E> {

  value: V

  inEdges: Set<IEdge<V, E>>;

  outEdges: Set<IEdge<V, E>>;

}

export interface IEdge<V, E> {

  from: IVertex<V, E>;
  to: IVertex<V, E>;
  weight: E;

}
