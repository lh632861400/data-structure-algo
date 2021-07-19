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
 * 双指针 + 虚拟节点
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {

  const virtualHead = new ListNode();

  let prevVal = null;

  let prev = virtualHead;

  let cur = head;

  let next;

  while(cur) {

    if(cur.val !== prevVal) {

      prev.next = cur;

      prev = cur;

      prevVal = prev.val;

      cur = cur.next;
    }else {
      next = cur.next;
      prev.next = next;
      cur = next;
    }

  }

  return virtualHead.next;

};
