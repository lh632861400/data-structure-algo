/**
 *
 * based on ArrayList
 *
 * @module BubbleSort2
 *
 * 在BubbleSort1基础之上优化：
 * 如果数组是有序的那就直接退出
 *
 * 时间：
 * 最好：O(n)     最差：O(n ^ 2)      平均： O(n ^ 2)
 *
 * 空间：
 * O(1)
 *
 * 是否稳定：稳定
 * in-place: in-place
 *
 * */
import Sort from "./Sort";

export default class BubbleSort2 extends Sort {

  protected sortArray(): void {

    for(let end = this.array.length - 1; end > 0; end--) {
      // 是否是有序的数组
      let sorted = true;
      for(let i = 1; i <= end; i++) {
        // 如果左边小于右边交换位置
        if(this.cmp(i - 1, i) > 0) {
          this.swap(i - 1, i)
          sorted = false;
        }
      }

      // 如果数组是有序的
      if(sorted) {
        return;
      }
    }

  }

}
