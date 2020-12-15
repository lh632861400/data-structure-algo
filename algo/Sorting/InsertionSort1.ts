/**
 *
 * based on ArrayList
 *
 * @module InsertionSort
 *
 * 数组前半部分有序，后半部分无序，把无序数组的第一个元素插入到有序数组合适的位置，减少比较次数
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

export default class InsertionSort1 extends Sort {

  protected sortArray(): void {

   for(let begin = 1; begin < this.array.length; begin++) {

     let cur = begin;

     while(this.cmp(cur, cur - 1) < 0) {
       this.swap(cur, cur - 1);
       cur--;
     }

   }

  }

}
