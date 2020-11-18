/**
 * Initialize your data structure here. Set the size of the deque to be k.
 * @param {number} k
 */
var MyCircularDeque = function(k) {
  this.size = 0;
  this.front = 0;
  this.elements = new Array(k)
};

/**
 * Adds an item at the front of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertFront = function(value) {

  if(this.isFull()) {
    return false;
  }

  if(this.size === 0) {
    this.elements[this.front] = value
  }else {
    const nextIndex = index(-1, this.front, this.elements.length);
    this.elements[nextIndex] = value
    this.front = nextIndex;
  }

  this.size++;
  return true;

};

/**
 * Adds an item at the rear of Deque. Return true if the operation is successful.
 * @param {number} value
 * @return {boolean}
 */
MyCircularDeque.prototype.insertLast = function(value) {

  if(this.isFull()) {
    return false;
  }

  if(this.size === 0) {
    this.elements[this.front] = value
  }else {
    this.elements[index(this.size, this.front, this.elements.length)] = value
  }

  this.size++;
  return true;

};

/**
 * Deletes an item from the front of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteFront = function() {

  if(this.isEmpty()) {
    return false;
  }

  const nextIndex = index(1, this.front, this.elements.length);
  this.elements[this.front] = undefined;
  this.front = nextIndex;
  this.size--;
  return true;

};

/**
 * Deletes an item from the rear of Deque. Return true if the operation is successful.
 * @return {boolean}
 */
MyCircularDeque.prototype.deleteLast = function() {

  if(this.isEmpty()) {
    return false;
  }

  const nextIndex = index(this.size - 1, this.front, this.elements.length);
  this.elements[nextIndex] = undefined;
  this.size--;
  return true;

};

/**
 * Get the front item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getFront = function() {

  if(this.isEmpty()) {
    return -1;
  }

  return this.elements[this.front];

};

/**
 * Get the last item from the deque.
 * @return {number}
 */
MyCircularDeque.prototype.getRear = function() {

  if(this.isEmpty()) {
    return -1;
  }

  return this.elements[index(this.size - 1, this.front, this.elements.length)];

};

/**
 * Checks whether the circular deque is empty or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isEmpty = function() {
  return this.size === 0;
};

/**
 * Checks whether the circular deque is full or not.
 * @return {boolean}
 */
MyCircularDeque.prototype.isFull = function() {
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
 * Your MyCircularDeque object will be instantiated and called as such:
 * var obj = new MyCircularDeque(k)
 * var param_1 = obj.insertFront(value)
 * var param_2 = obj.insertLast(value)
 * var param_3 = obj.deleteFront()
 * var param_4 = obj.deleteLast()
 * var param_5 = obj.getFront()
 * var param_6 = obj.getRear()
 * var param_7 = obj.isEmpty()
 * var param_8 = obj.isFull()
 */
