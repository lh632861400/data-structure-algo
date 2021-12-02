/**
 *
 *
 * thoughts:
 * map + priorityQueue
 *
 * @param {number} capacity
 */
var LFUCache = function(capacity) {

  this.capacity = capacity;

  this.size = 0;

  this.queue = [0];

  this.map = new Map();

  this.indexMap = new Map();

};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  const node = this.map.get(key);

  if(node) {
    this.modifyNode(key, node)
  }

  return node ? node.val : -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {

};

LFUCache.prototype.modifyNode = function(key, node) {

  node.count++;
  node.resetTime();

  const index = this.indexMap.get(key);

  this.shiftDown(index);

};

LFUCache.prototype.addToQueueTail = function(node) {

};

LFUCache.prototype.shiftDown = function(i) {

  let parent = i;

  const n = this.queue[0];

  while((parent << 1) <= n) {

    let child = this.minChild(parent);

    if(this.compare(parent, child) > 0) {
      swap(parent, child)
      parent = child;
      continue;
    }

    break;

  }

};

LFUCache.prototype.compare = function(i, j) {

};

LFUCache.prototype.minChild = function(parent) {

  let child = parent >> 1;

  if(child + 1 <= n) {
    if(this.compare(child, child + 1) < 0) {
      child = child + 1;
    }
  }

  return child;

};

class Node {

  value;

  count = 1;

  time = Date.now();

  constructor(value) {
    this.value = value;
  }

  resetTime() {
    this.time = Date.now();
  }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
