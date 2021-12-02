/**
 *
 *
 * thoughts:
 * 虚拟头 + 穿针引线
 *
 * Initialize your data structure here.
 */
var MyLinkedList = function() {

  this.size = 0;

  this.tail = null;

  this.virtualHead = new Node();

};

/**
 * Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {

  const node = this.getNode(index);

  if(node) {
    return node.val;
  }else {
    return -1;
  }

};

MyLinkedList.prototype.getNode = function(index) {

  if(index < 0 || index >= this.size) {
    return null;
  }

  let cur = this.virtualHead.next;

  let count = 0;

  while(cur && count < index) {

    cur = cur.next;

    count++;

  }

  return cur;

};

/**
 * Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {

  const head = this.virtualHead.next;

  const newHead = new Node(null, val, head);

  this.virtualHead.next = newHead;

  newHead.next = head;

  if(head) {
    head.prev = newHead;
  }

  if(!this.tail) {
    this.tail = newHead;
  }

  this.size++;

};

/**
 * Append a node of value val to the last element of the linked list.
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {

  const newTail = new Node(null, val, null);

  if(this.tail) {
    this.tail.next = newTail;
    newTail.prev = this.tail;

    this.tail = newTail;
  }else {
    this.virtualHead.next = newTail;

    this.tail = newTail;
  }

  this.size++;

};

/**
 * Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted.
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {

  if(index <= 0) {
    this.addAtHead(val);
    return;
  }

  if(index > this.size) {
    return;
  }

  const targetNode = this.getNode(index);

  if(!targetNode) {
    this.addAtTail(val)
  }else {

    const newNode = new Node(null, val, null);

    const prev = targetNode.prev;

    prev.next = newNode;

    newNode.prev = prev;

    newNode.next = targetNode;

    targetNode.prev = newNode;

  }

  this.size++;

};

/**
 * Delete the index-th node in the linked list, if the index is valid.
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {

  const targetNode = this.getNode(index);

  if(!targetNode) {
    return;
  }

  const prev = targetNode.prev;

  const next = targetNode.next;

  if(prev) {
    prev.next = next;
  }else {
    this.virtualHead.next = next;
  }

  if(next) {
    next.prev = prev;
  }else {
    this.tail = prev;
  }

  this.size--;

};

class Node {

  prev;
  val;
  next;

  constructor(prev, val, next) {
    this.prev = prev;
    this.val = val;
    this.next = next;
  }

}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
