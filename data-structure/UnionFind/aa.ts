import IUnionFind from "./IUnionFind";
import UnionFind_QF from "./UnionFind_QF";
import UnionFind_QU from "./UnionFind_QU";
import UnionFind_QU_S from "./UnionFind_QU_S";
import UnionFind_QU_R from "./UnionFind_QU_R";
import UnionFind_QU_R_PC from "./UnionFind_QU_R_PC";
import UnionFind_QU_R_PS from "./UnionFind_QU_R_PS";
import UnionFind_QU_R_PH from "./UnionFind_QU_R_PH";

const count = 100000;
function test(uf: IUnionFind, name: string) {

  console.log(`【${name}】`)

  const start = Date.now();

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

  for(let i = 0; i < count; i++) {
    uf.union((parseInt((Math.random() * count).toFixed(0))), (parseInt((Math.random() * count).toFixed(0))))
  }

  const end = Date.now();

  console.log(`开始时间: ${new Date(start)}`)
  console.log(`结束时间: ${new Date(end)}`)
  console.log(`时间: ${(end - start) / 1000}s`)

}

test(new UnionFind_QF(count + 10), 'UnionFind_QF');
test(new UnionFind_QU(count + 10), 'UnionFind_QU');
test(new UnionFind_QU_S(count + 10), 'UnionFind_QU_S');
test(new UnionFind_QU_R(count + 10), 'UnionFind_QU_R');
test(new UnionFind_QU_R_PC(count + 10), 'UnionFind_QU_R_PC');
test(new UnionFind_QU_R_PS(count + 10), 'UnionFind_QU_R_PS');
test(new UnionFind_QU_R_PH(count + 10), 'UnionFind_QU_R_PH');
