/**
 *
 * based on ArrayList
 *
 * @module MergeSort
 *
 * 在divider阶段不断减少数组，在merge阶段不断合并数组
 *
 * 时间：
 * 最好：O(nlgn)     最差：O(nlgn)     平均： O(nlgn)
 *
 * 空间：
 * O(n / 2 + lgn)
 *
 * 是否稳定：稳定
 * in-place: in-place
 *
 * */
import Sort from "./Sort";

export default class MergeSort extends Sort {

  leftArray: number[];

  protected sortArray(): void {

    this.leftArray = new Array((this.array.length + 1) >> 1)

    this.mergeSort(0, this.array.length - 1);

  }

  /**
   *
   * 分割[begin, end]之间的数组的元素
   *
   * */
  private mergeSort(begin: number, end: number) {

    if(end - begin < 1) {
      return;
    }

    const mid = begin + ((end - begin) >> 1);

    this.mergeSort(begin, mid);
    this.mergeSort(mid + 1, end);
    this.merge(begin, mid, end);

  }

  /**
   *
   * 合并[begin, mid]和[mid + 1, end]之间的数组
   *
   * */
  private merge(begin: number, mid: number, end: number) {

    let li = 0, le = mid - begin;
    let ri = mid + 1, re = end;
    let ai = begin;

    // 备份左边的数组
    for(let i = 0; i <= le; i++) {
      this.leftArray[i] = this.array[begin + i];
    }

    // 合并数组
    while(li <= le) {


      // 如果右边的数组小于左边的数组
      if( ri <= re && this.compare(this.array[ri], this.leftArray[li]) < 0) {
        this.array[ai++] = this.array[ri++];
      }else {
        this.array[ai++] = this.leftArray[li++];
      }
    }

  }

}
