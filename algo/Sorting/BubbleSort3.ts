/**
 *
 * based on ArrayList
 *
 * @module BubbleSort3
 *
 * 在BubbleSort1基础之上优化：
 * 如果数组是局部有序，缩小比较范围
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

export default class BubbleSort3 extends Sort {

  protected sortArray(): void {

    for(let end = this.array.length - 1; end > 0; end--) {
      // 是否是有序的数组，初始化值是为了数组是有序情况下直接退出
      let sortedIndex = 1;
      for(let i = 1; i <= end; i++) {
        // 如果左边小于右边交换位置
        if(this.cmp(i - 1, i) > 0) {
          this.swap(i - 1, i)
          sortedIndex = i;
        }
      }

      end = sortedIndex;
    }

  }

}
