/**
 *
 * based on ArrayList
 *
 * @module BubbleSort1
 *
 * */
import Sort from "./Sort";

export default class BubbleSort1 extends Sort {

  protected sortArray(): void {

    for(let end = this.array.length - 1; end > 0; end--) {
      for(let i = 1; i <= end; i++) {
        // 如果左边小于右边交换位置
        if(this.cmp(i - 1, i) < 0) {
          this.swap(i - 1, i)
        }
      }
    }

  }

}
