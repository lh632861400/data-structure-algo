/**
 *
 * based on ArrayList
 *
 * @module HeapSort
 *
 * 在SelectionSort基础之上优化：
 * 减少比较次数，采用二叉堆获取最大值
 *
 * 时间：
 * 最好：O(nlgn + n)     最差：O(nlgn + n)     平均： O(nlgn + n)
 *
 * 空间：
 * O(1)
 *
 * 是否稳定：稳定
 * in-place: in-place
 *
 * */
import Sort from "./Sort";

export default class HeapSort extends Sort {
  sizeMember: number;

  protected sortArray(): void {

    // 原地建堆

    // 采用自下而上的下滤
    this.sizeMember = this.array.length;
    const half = this.array.length >> 1;
    for(let i = half - 1; i >= 0; i--) {
      this.siftDown(i)
    }

    for(let end = this.array.length - 1; end > 0; end--) {
      // 把最大值交换到数组尾部
      this.swap(0, this.sizeMember - 1);
      this.sizeMember--;
      this.siftDown(0)
    }

  }

  private siftDown(index: number) {

    const element = this.array[index];

    // 得到非叶子节点的索引
    const half = this.sizeMember >> 1;

    // 如果index小于子节点

    while(index < half) {

      // 默认左节点为比较大的节点
      let childIndex = (index << 1) + 1;
      let child = this.array[childIndex];

      // 比较右节点和左节点
      const rightIndex = childIndex + 1;
      if(rightIndex < this.sizeMember && this.array[rightIndex] > child) {
        childIndex = rightIndex;
        child = this.array[rightIndex];
      }

      // 如果父节点小于叶子节点
      if(this.compare(element, child) < 0) {
        this.array[index] = child;
        index = childIndex;
      }

    }

    this.array[index] = element;

  }

}
