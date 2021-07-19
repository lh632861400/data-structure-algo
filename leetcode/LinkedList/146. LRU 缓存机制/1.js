/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {

  this.capacity = capacity;

  this.size = 0;

  this.map = new Map();

  this.head = null;

  this.tail = null;

};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  const node = this.map.get(key);

  if(node) {

    this.moveHead(node)

    return node.val;
  }else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {

  const node = this.map.get(key);

  if(node) {
    node.val = value;
    this.moveHead(node)
  }else {

    const newNode = new Node(key, value, null, null);

    this.addHead(newNode);

    this.map.set(key, newNode)

    this.size++;

    if (this.size > this.capacity) {
      this.map.delete(this.tail.key);

      this.removeTail();

      this.size--;
    }

  }

};

LRUCache.prototype.moveHead = function(node) {

  if(this.head !== node) {
    let next = node.next;
    let prev = node.prev;
    node.prev = null;
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
    if (prev) {
      prev.next = next;
    }

    if(next) {
      next.prev = prev;
    }else {
      this.tail = prev;
    }
  }

};

LRUCache.prototype.addHead = function(node) {

  if(!this.head) {
    this.head = this.tail = node;
  }else {
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

};

LRUCache.prototype.removeTail = function() {

  if(!this.tail) {
   return;
  }

  let prev = this.tail.prev;

  if(prev) {
    prev.next = null;
    this.tail.prev = null;
    this.tail = prev;
  }else {
    this.head = this.tail = null;
  }

};

function Node(key, val, prev, next) {
  this.key = key;
  this.val = val;
  this.next = next;
  this.prev = prev;
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
