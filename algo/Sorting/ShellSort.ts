/**
 *
 * based on ArrayList
 *
 * @module InsertionSort3
 *
 * 每一个组序列取一个轴点，比轴点大的放右边，比轴点小的放左边
 *
 * 时间：
 * 最好：O(n)     最差：O(n ^ 2)     平均： O(n ^ 2)
 *
 * 空间：
 * O(lgn)
 *
 * 是否稳定：当前算法不稳定，为了解决时间最差的问题，稳定的算法可能会出现时间最差的情况
 * in-place: in-place
 *
 * */
import Sort from "./Sort";

export default class ShellSort extends Sort {

  protected sortArray(): void {

    const setps = this.shellStepSquence(this.array.length)

    this.shellSort(setps);

  }

  /**
   *
   * 根据steps确定列数
   *
   * */
  private shellSort(steps: number[]) {

    for(let step of steps) {

      for(let col = 0; col < step; col++) {

        // col + row * step
        for (let begin = col + step; begin < this.array.length; begin += step) {

          let cur = begin;

          while (this.cmp(cur, cur - step) < 0) {
            this.swap(cur, cur - step);
            cur -= step;
          }

        }

      }

    }

  }

  private shellStepSquence(count: number) {

    const steps = [1];

    let step = 1;

    while(true) {
      step = step << 1;

      if(step > count) break;

      steps.push(step);
    }

    steps.reverse();

    return steps;

  }

}
