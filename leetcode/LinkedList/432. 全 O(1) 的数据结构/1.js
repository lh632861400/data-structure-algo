/**
 *
 *
 * thoughts:
 * map + 双向链表
 *
 *
 * Initialize your data structure here.
 */
var AllOne = function() {

  this.keyMap = new Map();

  this.firstValueMap = new Map();

  this.lastValueMap = new Map();

  this.virtualHead = new Node();

  this.tail = null;

};

/**
 * Inserts a new key <Key> with value 1. Or increments an existing key by 1.
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function(key) {

  let node = this.keyMap.get(key);

  if(!node) {
    // 更新key map
    node = new Node(key, 1);
    this.keyMap.set(key, node);

    if(!this.tail) {
      // 更新链表
      this.virtualHead.next = node;
      node.prev = this.virtualHead;
      this.tail = node;

      // 更新value map
      this.firstValueMap.set(node.value, node);

      this.lastValueMap.set(node.value, node);
    }else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;

      // 更新value map
      this.lastValueMap.set(node.value, node);
    }
  }else {
    node.value++;

    // 修改链表
    let prev = node.prev;
    let next = node.next;
    prev.next = next;
    if(next) {
      next.prev = prev;
    }else {
      if(prev !== this.virtualHead) {
        this.tail = prev;
      }else {
        this.tail = null;
      }
    }

    node.prev = null;
    node.next = null;

    // 得到需要插入的位置
    let targetNode = this.firstValueMap.get(node.value);

    if(!targetNode) {

      // 向前遍历查找位置

      let cur = node.prev;
      while(cur !== this.virtualHead) {
        if(cur.value > node.value) {
          break;
        }

        cur = cur.prev;
      }

      // 前一个节点
      if(cur) {
        let next = cur.next;
        cur.next = node;
        node.prev = cur;

        if(next) {
          node.next = next;
          next.prev = node;
        }
      }

      // 更新 value map
      this.firstValueMap.set(node.value, node)


    }else {
      let prev = targetNode.prev;
      let next = targetNode.next;

      prev.next = node;
      node.prev = prev;

      if(next) {
        next.prev = node;
        node.next = next;
      }

      // 更新value map
      this.firstValueMap.set(node.value, node)
    }

    if(this.tail === null) {
      this.tail = node;
    }
  }

};

/**
 * Decrements an existing key by 1. If Key's value is 1, remove it from the data structure.
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function(key) {

  let node = this.keyMap.get(key);

  if(!node) {

    return;

  }else {
    node.value--;

    if(node.value === 0) {

      // 删除map
      this.keyMap.delete(key);

      // 修改链表
      let prev = node.prev;
      let next = node.next;

      prev.next = next;

      node.prev = null;
      node.next = null;

      if(next) {
        next.prev = prev;
      }else {
        if(prev !== this.virtualHead) {
          this.tail = prev;
        }else {
          this.tail = null;
        }
      }


    }else {

    }

  }

};

/**
 * Returns one of the keys with maximal value.
 * @return {string}
 */
AllOne.prototype.getMaxKey = function() {
  let maxNode = this.virtualHead.next;

  if(maxNode) {
    return maxNode.key;
  }else {
    return "";
  }
};

/**
 * Returns one of the keys with Minimal value.
 * @return {string}
 */
AllOne.prototype.getMinKey = function() {

  if(this.tail) {
    return this.tail.key
  }else {
    return ""
  }

};

class Node {

  next = null;
  prev = null;

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

}

/**
 * Your AllOne object will be instantiated and called as such:
 * var obj = new AllOne()
 * obj.inc(key)
 * obj.dec(key)
 * var param_3 = obj.getMaxKey()
 * var param_4 = obj.getMinKey()
 */
