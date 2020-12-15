/**
 *
 * based on ArrayList
 *
 * @module InsertionSort2
 *
 * 在InsertionSort1基础之上优化：
 * 将交换改为挪动
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

export default class InsertionSort2 extends Sort {

  protected sortArray(): void {

   for(let begin = 1; begin < this.array.length; begin++) {

     let cur = begin;

     const element = this.array[begin];

     while(cur > 0 && this.compare(element, this.array[cur - 1]) < 0) {
       this.array[cur] = this.array[cur - 1];
       cur--;
     }

     this.array[cur] = element;

   }

  }

}
