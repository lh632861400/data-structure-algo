/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 *
 *
 * thoughts:
 * 虚拟节点
 * 参考：
 * 83. 删除排序链表中的重复元素
 *
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {

  let next = node.next;

  let nextnext = next.next;

  if(next) {
    node.val = next.val;
  }

  node.next = nextnext;

};
