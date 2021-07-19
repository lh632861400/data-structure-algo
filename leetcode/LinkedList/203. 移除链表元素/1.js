/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 *
 *
 * thoughts:
 * 穿针引线 + 虚拟节点
 *
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {

  if(!head) {
    return head;
  }

  const virtualHead = new ListNode();

  virtualHead.next = head;

  let prev = virtualHead;

  let cur = head;

  let next;

  while(cur) {
    next = cur.next;

    if(cur.val === val) {
      prev.next = next;
    }else {
      prev = cur;
    }

    cur = next;
  }

  return virtualHead.next;

};
