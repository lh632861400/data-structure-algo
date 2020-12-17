/**
 *
 * based on ArrayList
 *
 * @module InsertionSort2
 *
 * 在InsertionSort1基础之上优化：
 * 二分搜索元素位置
 * 查找元素右边界
 *
 * 时间：
 * 最好：O(n)     最差：O(n ^ 2)     平均： O(n ^ 2)
 *
 * 空间：
 * O(1)
 *
 * 是否稳定：稳定
 * in-place: in-place
 *
 * */
import Sort from "./Sort";

export default class InsertionSort3 extends Sort {

  protected sortArray(): void {

   for(let begin = 1; begin < this.array.length; begin++) {

     const element = this.array[begin];
     const insertedIndex = this.search(begin);

     for(let i = begin - 1; i >= insertedIndex; i--) {
       this.array[i + 1] = this.array[i];
     }

     this.array[insertedIndex] = element;

   }

  }

  /**
   *
   * 查找 index 索引所在元素插入的位置
   *
   * */
  private search(index: number) {
    let left = 0;
    let right = index - 1;

    while(left <= right) {

      const mid = left + ((right - left) >> 1);

      // 如果相等
      if(this.cmp(mid, index) <= 0) {
        left = mid + 1;
      }else {
        right = mid - 1;
      }

    }

    // left索引位置是插入元素的位置
    // 最后一个元素相等 left = mid + 1;
    // 最后一个元素 array[mid] < array[index] left = mid + 1;
    // 最后一个元素 array[mid] > array[index] right = mid - 1;
    // 这些结果是 left  = right + 1;

    return left;


  }

}
