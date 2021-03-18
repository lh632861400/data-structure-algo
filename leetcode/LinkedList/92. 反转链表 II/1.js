/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {

  if(left === right) {
    return head
  }

  let leftNode = head;
  let prev;
  let tail;
  let rightNode;
  let currentNode;
  let prevNode;

  let num = 1;

  // 找到翻转链表之前的一个节点
  while(leftNode) {

    if(num + 1 < left) {
      num++;
      leftNode = leftNode.next;
    }else {
      break;
    }

  }

  // 找到链表的头部
  if(num === left) {
    prev = leftNode;
    leftNode = null;
  }else {
    prev = leftNode.next;
    num++;
  }

  currentNode = prev;

  let currentNodeNext;
  while(num <= right && currentNode) {

    currentNodeNext = currentNode.next;

    if(prevNode) {
      currentNode.next = prevNode;
    }

    prevNode = currentNode;
    currentNode = currentNodeNext;

    num++;

  }

  // 找到翻转列表的尾部
  tail = prevNode;

  // 找到翻转列表尾部的下一个节点
  rightNode = currentNode;

  if(leftNode) {
    leftNode.next = tail;
  }else {
    head = tail;
  }

  prev.next = rightNode;

  return head;

};
