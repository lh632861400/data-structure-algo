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
 * 穿针引线
 * 参考：
 * 92. 反转链表 II
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {

  if(!head) {
    return head;
  }

  let prev = null;

  let cur = head;

  let next;

  while(cur) {

    // 记录关系
    next = cur.next;

    // 穿针
    cur.next = prev;

    // 重置状态
    prev = cur;

    cur = next;
  }

  return prev;

};
