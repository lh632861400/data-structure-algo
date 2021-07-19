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
 * 快慢指针 + 穿针引线
 * 参考：
 * 206. 反转链表
 *
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function(head) {

  if(!head) {
    return;
  }

  let fast = head;
  let slow = head;

  while(fast && fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  }

  if(fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  reorderListHelper(slow);

  let cur = head;
  let nextCur = fast;
  let next;

  while(cur && cur !== nextCur) {
    next = cur.next;

    cur.next = nextCur;

    cur = nextCur;
    nextCur = next;
  }

};

function reorderListHelper(start) {

  if(!start) {
    return null;
  }

  let prev = null;

  let cur = start;

  let next;

  while (cur) {
    next = cur.next;
    cur.next = prev;

    prev = cur;

    cur = next;
  }

  return prev;

}
