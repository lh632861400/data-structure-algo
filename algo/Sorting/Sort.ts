
export default abstract class Sort {
  array: number[];
  cmpCount: number;
  swapCount: number;

  sort(array: number[]) {
    if(!array || array.length < 2) return;

    this.array = array;

    this.sortArray()
  }

  protected abstract sortArray(): void;

  protected  cmp(i1: number, i2: number) {
    return this.array[i1] - this.array[i2];
  }

  protected  swap(i1: number, i2: number) {
    const tmp = this.array[i1];
    this.array[i1] = this.array[i2];
    this.array[i2] = tmp;
  }

}
