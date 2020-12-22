import IUnionFind from "./IUnionFind";
import UnionFind_QF from "./UnionFind_QF";

function test(uf: IUnionFind) {

  uf.union(0, 1);
  uf.union(1, 2);
  uf.union(2, 3);
  uf.union(3, 4);

  uf.union(5, 6);
  uf.union(6, 7);
  uf.union(7, 8);
  uf.union(10, 11);

  console.log(uf.isSame(0, 1))
  console.log(uf.isSame(2,8))
  console.log(uf.isSame(10, 11))

}

test(new UnionFind_QF(16));
