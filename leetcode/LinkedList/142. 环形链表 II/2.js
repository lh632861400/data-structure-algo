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
 * https://leetcode-cn.com/problems/linked-list-cycle-ii/solution/huan-xing-lian-biao-ii-by-leetcode-solution/
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {

  let fast = head;

  let slow = head;

  while(fast && fast.next) {
    fast = fast.next.next;
    slow = slow.next;

    if(slow === fast) {
      let ptr = head;

      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }

      return ptr;
    }
  }

  return null;

};
