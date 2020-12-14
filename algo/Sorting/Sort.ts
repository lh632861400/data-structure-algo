
export default abstract class Sort {
  protected  array: number[];
  private cmpCount: number;
  private swapCount: number;
  private time: number;

  constructor() {
    this.cmpCount = 0;
    this.swapCount = 0;
    this.time = 0;
  }

  sort(array: number[]) {
    if(!array || array.length < 2) return;

    this.array = array;

    this.time = Date.now();
    this.sortArray();
    this.time = Date.now() - this.time;
  }

  protected abstract sortArray(): void;

  protected  cmp(i1: number, i2: number) {
    this.cmpCount++;
    return this.array[i1] - this.array[i2];
  }

  protected  compare(v1: number, v2: number) {
    this.cmpCount++;
    return v1 - v2
  }

  protected  swap(i1: number, i2: number) {
    const tmp = this.array[i1];
    this.array[i1] = this.array[i2];
    this.array[i2] = tmp;
    this.swapCount++;
  }

  protected numberToString(num: number) {
    if(num < 10000) {
      return num;
    }else if(num > 100000000) {
      return `${(num / 100000000).toFixed(2)}亿`
    }else {
      return `${(num / 10000).toFixed(2)}万`
    }
  }

  toString(this: any, name: string) {
    let result = '';
    result = result + `【${name}】` + '\n'
              + `时间：${this.time / 1000}s(${this.time}ms)` + '\t'
              + `比较: ${this.numberToString(this.cmpCount)}` + '\t'
              + `交换：${this.numberToString(this.swapCount)}`

    return result;
  }

}
