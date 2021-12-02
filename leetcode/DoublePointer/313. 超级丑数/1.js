/**
 *
 *
 * thoughts:
 * 优先级队列
 * O(nlgn)
 * O(n)
 *
 *
 * @param {number} n
 * @param {number[]} primes
 * @return {number}
 */
var nthSuperUglyNumber = function(n, primes) {

  const queue = new PriorityQueue((a, b) => {
    return a - b;
  }, primes)

  let cur = 1;
  let i = 1;

  while(i < n) {

    cur = queue.poll();

    while(!queue.isEmpty() && cur === queue.peek()) {
      cur = queue.poll();
    }

    i++;

    for(let j = 0; j < primes.length; j++) {
      queue.offer(cur * primes[j])
    }


  }

  return cur;

};

class PriorityQueue {

  compare;
  arr = [0];

  constructor(compare, iterator) {
    this.compare = compare;

    if(iterator) {
      for(let item of iterator) {
        this.arr.push(item)
        this.arr[0]++;
      }

      this.heapify()
    }
  }

  heapify() {

    let cur = this.arr.length >> 1;
    const n = this.arr[0];

    for(let i = cur; i > 0; i--) {
      this.shiftDown(i)
    }


  }

  shiftDown(i) {

    const n = this.arr[0];

    while((i << 1) <= n) {

      debugger

      let child = i << 1;

      child = this.minChild(child, child + 1)

      if(this.compare(this.arr[i], this.arr[child]) > 0) {
        this.swap(i, child)
        i = child;
        continue;
      }

      break;
    }



  }

  shiftUp(i) {

    const n = this.arr[0];

    let cur = i;

    while(cur > 1) {

      let parent = cur >> 1;

      if(this.compare(this.arr[cur], this.arr[parent]) < 0) {
        this.swap(cur, parent);
        cur = parent;
        continue;
      }

      break;

    }

  }

  minChild(left, right) {

    const n = this.arr[0];

    if(right > n) {
      return left;
    }else {
      if(this.compare(this.arr[left], this.arr[right]) <= 0) {
        return left;
      }else {
        return right;
      }
    }

  }

  swap(i, j) {

    let temp = this.arr[i];

    this.arr[i] = this.arr[j];

    this.arr[j] = temp;

  }

  offer(item) {
    this.arr[0]++;
    this.arr[this.arr[0]] = item;
    this.shiftUp(this.arr[0])
  }

  poll() {
    if(this.arr[0] === 0) {
      return null;
    }

    const n = this.arr[0];
    const min = this.arr[1];
    let item = this.arr[n];
    this.arr[n] = null;
    this.arr[0]--;

    if(this.arr[0] === 0) {
      return min;
    }

    this.arr[1] = item;
    this.shiftDown(1);

    return min;
  }

  peek() {
    if(this.arr[0] === 0) {
      return null;
    }

    return this.arr[1];
  }

  isEmpty() {
    return !this.arr[0]
  }

}
