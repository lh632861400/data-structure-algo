/**
 *
 * thoughts:
 * 单调队列
 * O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function Deque() {
  this.size = 0;
  this.elements = []
}

Deque.prototype.peekFirst = function () {
  return this.elements[0]
};

Deque.prototype.peekLast = function () {
  return this.elements[this.size - 1]
};

Deque.prototype.removeFirst = function () {
  this.size--;
  return this.elements.shift();
};

Deque.prototype.removeLast = function () {
  this.size--;
  return this.elements.pop()
};

Deque.prototype.addFirst = function (element) {
  this.elements.unshift(element)
  this.size++;
};

Deque.prototype.addLast= function (element) {
  this.elements.push(element)
  this.size++;
};

Deque.prototype.isEmpty= function () {
  return this.size === 0;
};

var maxSlidingWindow = function(nums, k) {
  if(!nums.length) {
    return []
  }

  const deque = new Deque();

  // 保存单调队列
  for(let i = 0; i < k; i++) {

    while (!deque.isEmpty() && nums[i] > deque.peekLast()) {
      deque.removeLast()
    };

    deque.addLast(nums[i])

  }

  const dequeValue = [];
  dequeValue.push(deque.peekFirst())

  for(let i = k; i < nums.length; i++) {

    // 如果最大值已经不再滑动窗口
    if(nums[i - k] === deque.peekFirst()) deque.removeFirst();

    while (!deque.isEmpty() && nums[i] > deque.peekLast()) {
      deque.removeLast()
    }

    deque.addLast(nums[i]);

    dequeValue.push(deque.peekFirst());

  }

  return dequeValue;
};
