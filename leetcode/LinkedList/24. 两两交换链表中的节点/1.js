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
 * 先穿后排在判空
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {

  let cur = head;

  const virtualHead = new ListNode();

  let prev = virtualHead;

  while(cur && cur.next) {

    // 记录节点关系
    let next = cur.next;

    let nextnext = next.next;

    // 穿针
    next.next = cur;
    // cur.next = null;

    prev.next = next;

    // 记录前一个交换位置的前驱
    prev = cur;

    cur = nextnext;

  }

  prev.next = cur;

  return virtualHead.next;

};
