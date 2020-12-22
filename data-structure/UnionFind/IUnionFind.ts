/**
 *
 * based on ArrayList
 *
 * @module IUnionFind
 *
 * 并查集
 *
 * */
export default abstract class IUnionFind {

  parents: number[];

  constructor(capacity: number) {

    if (!capacity || capacity < 0) {
      throw new Error('capacity must be number')
    }

    const parents = new Array(capacity);

    for (let i = 0; i < parents.length; i++) {
      parents[i] = i;
    }

    this.parents = parents;
  }

  /**
   *
   * 所在集合根元素
   *
   * */
   abstract find(v: number): number;

  /**
   *
   * 合并v1和v2所在的两个集合
   *
   * */
  abstract union(v1: number, v2: number): void;

  isSame(v1: number, v2: number) {
    return this.find(v1) === this.find(v2);
  }

  check(v: number) {
    if(v < 0 || v >= this.parents.length) {
      throw new Error('v is out of range')
    }
  }

}




