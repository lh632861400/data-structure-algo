/**
 * Initialize your data structure here. Set the size of the queue to be k.
 * @param {number} k
 */
var MyCircularQueue = function(k) {
  this.size = 0;
  this.front = 0;
  this.elements = new Array(k);
};

/**
 * Insert an element into the circular queue. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function(value) {
  // 判断元素是否已满
  if(this.isFull()) {
    return false;
  }

  if(this.size === 0) {
    this.elements[this.front] = value;
  }else {

    // 下一个元素的位置索引
    const nextIndex = index(this.size, this.front, this.elements.length);
    this.elements[nextIndex] = value;

  }

  this.size++;

  return true;
};

/**
 * Delete an element from the circular queue. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function() {
  if(this.isEmpty()) {
    return false;
  }

  // 删除this.front的元素
  this.elements[this.front] = undefined;
  const nextIndex = index(1, this.front, this.elements.length);
  this.front = nextIndex;
  this.size--;
  return true;
};

/**
 * Get the front item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Front = function() {
  if(this.isEmpty()) {
    return -1;
  }

  return this.elements[this.front]
};

/**
 * Get the last item from the queue.
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function() {
  if(this.isEmpty()) {
    return -1;
  }

  return this.elements[index(this.size - 1, this.front, this.elements.length)]
};

/**
 * Checks whether the circular queue is empty or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function() {
  return this.size === 0;
};

/**
 * Checks whether the circular queue is full or not.
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function() {
  return this.size === this.elements.length;
};

function index(offset, start, len) {
  let nextIndex = offset + start;

  if(nextIndex < 0) {
    nextIndex = nextIndex + len
  }else if(nextIndex >= len) {
    nextIndex = nextIndex - len;
  }

  return nextIndex;
}


/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
