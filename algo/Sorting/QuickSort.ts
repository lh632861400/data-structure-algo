/**
 *
 * based on ArrayList
 *
 * @module QuickSort
 *
 * 每一个组序列取一个轴点，比轴点大的放右边，比轴点小的放左边
 *
 * 时间：
 * 最好：O(nlgn)     最差：O(n ^ 2)     平均： O(nlgn)
 *
 * 空间：
 * O(lgn)
 *
 * 是否稳定：当前算法不稳定，为了解决时间最差的问题，稳定的算法可能会出现时间最差的情况
 * in-place: in-place
 *
 * */
import Sort from "./Sort";

export default class QuickSort extends Sort {

  leftArray: number[];

  protected sortArray(): void {

    this.leftArray = new Array((this.array.length + 1) >> 1)

    this.quickSort(0, this.array.length - 1);

  }

  /**
   *
   * 分割[begin, end]之间的数组的元素
   *
   * */
  private quickSort(begin: number, end: number) {

    if(end - begin < 1) {
      return;
    }

    // 返回轴点元素所在索引
    const index = this.pivotIndex(begin, end);

    // 递归轴点元素的所有子序列
    this.quickSort(begin, index - 1);
    this.quickSort(index + 1, end);

  }

  private pivotIndex(begin: number, end: number) {

    // 随机挑选轴点元素
    this.swap(begin, begin + ((Math.random() * (end - begin + 1) as any).toFixed(0) * 1))

    // 备份轴点元素
    const value = this.array[begin];

    // 查找轴点元素所在索引
    while(begin < end) {

      // end -> begin
      while(begin < end) {

        if(this.compare(value, this.array[end]) < 0) {
          end--;
        }else {
          // 将元素放在轴点左边
          this.array[begin++] = this.array[end];
          break;
        }

      }

      while(begin < end) {

        if(this.compare(value, this.array[begin]) > 0) {
          begin++;
        }else {
          this.array[end++] = this.array[begin];
          break;
        }

      }

    }

    this.array[begin] = value;

    return begin;

  }

}
