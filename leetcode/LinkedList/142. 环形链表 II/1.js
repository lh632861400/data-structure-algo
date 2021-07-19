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
 * 记忆化
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {

  const set = new WeakSet();

  let cur = head;

  while(cur) {
    if(set.has(cur)) {
      return cur;
    }

    set.add(cur);

    cur = cur.next;
  }

  return null;

};
